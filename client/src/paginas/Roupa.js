import React, {Component} from 'react';
import './cssStyle.css';
import axios from 'axios';

class Roupa extends Component {

  render() {
    return (
        <React.Fragment>
    <div className = "containerFundo" id="fundo">
        <div className = "container">
          <h1>
            Nova Roupa
          </h1>
        </div>
        <div className="containerNew">
          <form action="post">
              <h3>Nome da roupa</h3>
              <input type="text" name="nome_roupa" placeholder="Exemplo: Vestido de seda" className="form-control" id="form-login"/> 
              <h3>Tempo de confecção (Horas)</h3>
              <input type="number" name="tempo_confecc_em_horas" placeholder="Somente números" className="form-control" id="form-login"/>
              <h3>Lucro obtido na venda (R$)</h3>
              <input type="number" name="Lucro obtido" placeholder="Exemplo: 50.00" className="form-control" id="form-login"/> 
              
          </form>
        </div>
      </div>
  
      <div className ="containerFundo segundaDiv" id="fundo">
          <div class = "container">
              <h1>
                Materias da roupa
              </h1>
            </div>
        <div className = "containerNew">
          <h3>Nome do material</h3>
          <select name="materiais" className="form-control" id="form-login">
            <option value="materiais">Materiais</option>
            <option value="seda">Seda</option>
            <option value="linha">Linha</option>
          </select>
          <h3>Quantidade</h3>
          <input type="number" name="Lucro obtido" placeholder="Exemplo: 50.00" className="form-control" id="form-login"/> 
          <button type="submit" name="adicionar_material" className="btn btn-sign-up center-block">Adicionar material</button>
        </div>
      </div>
      <div className="container-ask">
        <button type="submit" name="adicionar_material" className="btn btn-sign-up center-block pull-left">Adicionar roupa</button>
        <button type="submit" name="adicionar_material" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
     </div>
     </React.Fragment>
    );
  }
}

export default Roupa;