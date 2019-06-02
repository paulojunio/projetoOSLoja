/*var glpk = require('glpk');

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
}*/

module.exports = {
    solve:(data,res) => {
		const yasmij = require("yasmij");
		var linha = 0;
		var coluna = 0;
		var materiais = 0;
		var auxNum = 0;
		var fObjetive = '';
		var fConstraints = [];
	
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length-1) {
				fObjetive += data.todasRoupas[linha].lucro + data.todasRoupas[linha].nome + " + ";
			}else{
				fObjetive += data.todasRoupas[linha].lucro + data.todasRoupas[linha].nome;
			}

		}
		console.log("\n Função de maximizar");
		console.log(fObjetive);

		var auxfObjetive = [];
		var aux = '';
		for(linha = 0; linha < (data.materiaisUtilizados.length); linha++){
			auxfObjetive = [];
			aux = '';
			for(coluna = 0; coluna < data.todasRoupas.length; coluna ++){
				for(materiais = 0; materiais < data.todasRoupas[coluna].materiaisUsados.length; materiais++){
					if(data.todasRoupas[coluna].materiaisUsados[materiais].nome == data.materiaisUtilizados[linha].nome) {
						auxfObjetive.push(data.todasRoupas[coluna].materiaisUsados[materiais].quantidade + data.todasRoupas[coluna].nome);
					}
				}
			}

			for(auxNum = 0; auxNum < auxfObjetive.length; auxNum++) {
				if(auxNum < auxfObjetive.length - 1) {
					aux += auxfObjetive[auxNum] + " + ";
				}else {
					aux += auxfObjetive[auxNum] + " <= " +  data.materiaisUtilizados[linha].quantidade;
				}
			}
			if(aux != '') {
				fConstraints.push(aux);
			}
		}

		var tempoConf = '';
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length - 1) {
				tempoConf += data.todasRoupas[linha].tempoConf + data.todasRoupas[linha].nome + " + ";
			}else{
				tempoConf += data.todasRoupas[linha].tempoConf + data.todasRoupas[linha].nome + " <= " + data.tempoTotalConf*data.quantidadeCostu;
			}
		}
		fConstraints.push(tempoConf);
		console.log("\n Funçoes de restrições");
		console.log(fConstraints);
		var input = {
			type: "maximize",
			objective : fObjetive,
			constraints : fConstraints
		};

		var output = yasmij.solve(input);

		var respostaVetor = [];
		respostaVetor.push("O lucro maximo obtido foi " + output.result['z'] + " para isso deve-se fazer as seguintes quantidades de roupas:");
		var respostaPronta = "O lucro maximo obtido foi " + output.result['z'] + " para isso deve-se fazer as seguintes quantidades de roupas:";
		
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length - 1) {
				respostaVetor.push(data.todasRoupas[linha].nome + " : " + output.result[data.todasRoupas[linha].nome] +  " Peças ");
				//respostaPronta += data.todasRoupas[linha].nome + " : " + output.result[data.todasRoupas[linha].nome] +  " Peças ";
			}else{
				respostaVetor.push(data.todasRoupas[linha].nome + " : " + output.result[data.todasRoupas[linha].nome] +  " Peças ");
				//respostaPronta += data.todasRoupas[linha].nome + " : " + output.result[data.todasRoupas[linha].nome] +  " Peças ";
			}
		}
		//Exemplo de saída para sensibilidade
		//respostaVetor.push("Se caso queira aumentar o Jeans, Linho, os valores de Jeans podem variar entre 60 a 360, e o Linho pode variar entre 105 a 630.");
		//respostaVetor.push("Se por exemplo a quantidade de Jeans mudar para 360 metros, a quantidade de Bermuda seria 0, e quantidade de Jaquetas seria 18.");

		var fs = require('fs');

		fs.unlink('math.txt', function (err) {
			if (err) throw err;
			// if no error, file has been deleted successfully
			console.log('File deleted!');
		}); 

		var logger = fs.createWriteStream('math.txt', {
			flags: 'a' // 'a' means appending (old data will be preserved)
		})

		//criar arquivo para glpsol
		var variaveis = []; // Variaveis aqui
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			aux = "var " + data.todasRoupas[linha].nome + ";";	
			variaveis.push(aux);
			logger.write(aux + '\n');
		}
		//função objetivo
		var objectiveFunction = 'maximize z:';
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length-1) {
				objectiveFunction += data.todasRoupas[linha].lucro + " * " + data.todasRoupas[linha].nome + " + ";
			}else{
				objectiveFunction += data.todasRoupas[linha].lucro + " * " + data.todasRoupas[linha].nome + ";";
			}
		}
		logger.write(objectiveFunction + '\n');
		var ultimaLinha = 0;
		fConstraints = [];
		var auxfObjetive = [];
		var aux = '';
		for(linha = 0; linha < (data.materiaisUtilizados.length); linha++){
			auxfObjetive = [];
			ultimaLinha = linha;
			aux = 's.t. c' + (linha+1) + ': ';
			for(coluna = 0; coluna < data.todasRoupas.length; coluna ++){
				for(materiais = 0; materiais < data.todasRoupas[coluna].materiaisUsados.length; materiais++){
					if(data.todasRoupas[coluna].materiaisUsados[materiais].nome == data.materiaisUtilizados[linha].nome) {
						auxfObjetive.push(data.todasRoupas[coluna].materiaisUsados[materiais].quantidade + " * " + data.todasRoupas[coluna].nome);
					}
				}
			}

			for(auxNum = 0; auxNum < auxfObjetive.length; auxNum++) {
				if(auxNum < auxfObjetive.length - 1) {
					aux += auxfObjetive[auxNum] + " + ";
				}else {
					aux += auxfObjetive[auxNum] + " <= " +  data.materiaisUtilizados[linha].quantidade + ';';
				}
			}
			if(aux != '') {
				fConstraints.push(aux);
				logger.write(aux + '\n');
			}
		}
		ultimaLinha += 2;
		tempoConf = 's.t. c' + ultimaLinha + ': ';
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length - 1) {
				tempoConf += data.todasRoupas[linha].tempoConf + ' * ' + data.todasRoupas[linha].nome + " + ";
			}else{
				tempoConf += data.todasRoupas[linha].tempoConf + ' * ' + data.todasRoupas[linha].nome + " <= " + data.tempoTotalConf*data.quantidadeCostu + ';';
			}
		}
		fConstraints.push(tempoConf);
		logger.write(tempoConf + '\n');

		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			logger.write('s.t. c' + (linha+1+ultimaLinha) + ': ' + data.todasRoupas[linha].nome + " >= 0;\n");		
		}
		
		logger.write("solve;\n");

		var display = 'display ';
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			if(linha < data.todasRoupas.length - 1) {
				display += data.todasRoupas[linha].nome + ", ";
			}else{
				display += data.todasRoupas[linha].nome + ';';
			}			
		}
		for(linha = 0; linha < data.todasRoupas.length; linha++) {
			logger.write('printf \"Valor do dual da restricao ' + (linha+1) + ': %g \\n\", c1.dual; \n');		
		}
		logger.write(display + '\n');
		//logger.write(dual + "\n");
		logger.write("end;");
		console.log(variaveis);
		console.log(objectiveFunction);
		console.log(fConstraints);

		console.log(JSON.stringify(output,null,2));
		res.send({optimization: respostaVetor});
	}
}