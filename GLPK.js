var glpk = require('glpk');

module.exports = {
    solve:(data,res) => {
    	//Comecou a inicializacao do problema
    	let lp = new glpk.Problem();
		lp.setProbName("LojadeRoupas");
		lp.setObjDir(glpk.MAX);

		console.log(data);
		// Definir colunas, variaveis de decisao
		lp.addCols(data.todasRoupas.length);

		//Tem dentro de roupas: nome dela, tempo de confeccao, o lucro obtido, vetor de materias que usa na roupa
		//Calca jeans
		//console.log("Roupas");
		var v_d;
		for (v_d = 0; v_d < data.todasRoupas.length; v_d ++){
			//console.log(typeof(data.todasRoupas[v_d].nome));
			//var nome = data.todasRoupas[v_d].nome;
			lp.setColName(v_d+1, data.todasRoupas[v_d].nome);
			lp.setColBnds(v_d+1, glpk.LO, 0,0);
		}
		//Tecidos utilizados(incluindo linha), tempo de confeccao
		//console.log(data.materiaisUtilizados)
		lp.addRows(data.materiaisUtilizados.length+1);

		console.log("Materiais");
		for (r = 0; r < data.materiaisUtilizados.length; r++){
			//console.log("Aqui dentro");
			//console.log(data.materiaisUtilizados[r]);
			lp.setRowName(r+1, data.materiaisUtilizados[r].nome);
			lp.setRowBnds(r+1, glpk.UP, 0, parseFloat(data.materiaisUtilizados[r].quantidade));
		}

		lp.setRowName((data.materiaisUtilizados.length+1), "Confeccao");
		lp.setRowBnds((data.materiaisUtilizados.length+1), glpk.UP, 0, data.tempoTotalConf*data.quantidadeCostu);

		var i = new Int32Array((data.todasRoupas.length*(data.materiaisUtilizados.length+1))+1);
		var j = new Int32Array((data.todasRoupas.length*(data.materiaisUtilizados.length+1))+1);
		var valor = new Float64Array((data.todasRoupas.length*(data.materiaisUtilizados.length+1))+1);

		var initial;
		var linha = 0;
		var coluna = 0;
		var posicao = 1;
		var posicao2 = 1;
		var materiais = 0;
		var todos = true;
		console.log(data.materiaisUtilizados.length);
		for(linha = 0; linha < (data.materiaisUtilizados.length+1); linha++){
			for(coluna = 0; coluna < data.todasRoupas.length; coluna ++){
				i[posicao2] = linha+1;
				j[posicao2] = coluna+1;
				posicao2 ++;
				if(linha >= data.materiaisUtilizados.length ){
					valor[posicao] = data.todasRoupas[coluna].tempoConf;
					todos = false;
				}else{
					for(materiais = 0; materiais < data.todasRoupas[coluna].materiaisUsados.length; materiais++){
						if (data.todasRoupas[coluna].materiaisUsados[materiais].nome == data.materiaisUtilizados[linha].nome){
							valor[posicao] = data.todasRoupas[coluna].materiaisUsados[materiais].quantidade;
							todos = false;
						}
					}
					if (todos){
						valor[posicao] = 0;
						todos = true;
					}
						
				}
				posicao ++;	
			}
		}

		//console.log(i);
		//console.log(j);
		//console.log(valor);
		//console.log(((data.todasRoupas.length*(data.materiaisUtilizados.length+1))));
		lp.loadMatrix(((data.todasRoupas.length*(data.materiaisUtilizados.length+1))), i, j, valor);
		
		for (v_d = 0; v_d < data.todasRoupas.length; v_d ++){
			lp.setObjCoef(v_d+1, parseFloat(data.todasRoupas[v_d].lucro));
		}
		let param = {msgLev : glpk.MSG_ALL,
                meth : glpk.PRIMAL,
                pricing : glpk.PT_STD,
                rTest : glpk.RT_STD};
		lp.simplexSync(param);

		let z = lp.getObjVal();
		var all_Cols = new Array(data.todasRoupas.length);
		var nomes = new Array(data.todasRoupas.length);
		for (v_d = 0; v_d < data.todasRoupas.length; v_d ++){
			all_Cols[v_d] = "\n" + data.todasRoupas[v_d].nome + ": " + parseInt(lp.getColPrim(v_d+1));
		}

		// lp.glpPrintSol();
		//console.log("Teste");
		//console.log(z);
		//console.log(all_Cols);


        //console.log(data);
        solvelog = "Solução encontrada: \nLucro total:" + z + "\n Quantos produzir: " + all_Cols;
        res.send({optimization: solvelog});
        
    }
}