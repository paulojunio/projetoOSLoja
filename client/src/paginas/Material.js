import React, {Component} from 'react';
import './cssStyle.css';


class Material extends Component {

  render() {
    return (
        <React.Fragment>
        <div className="containerFundo" id="fundo">
        <div className="container">
          <h1>
            Novo Material
          </h1>
        </div>
        <div className="containerNew">
          <form action="post">
              <h3>Nome do material</h3>
              <input type="text" name="nome_material" placeholder="Exemplo: linha" className="form-control" id="form-login"/>
              <h3>Quantidade desse material</h3>
              <input type="number" name="quantidade_material" placeholder="Somente números" className="form-control" id="form-login"/>
          </form>
        </div>
        </div>
      <div className="container-ask">
        <button type="submit" name="adicionar_material" className="btn btn-sign-up center-block pull-left">Adicionar material</button>
        <a href="/roupa">
        <button type="submit" name="proximo_passo" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
        </a>
      </div> 
      
    </React.Fragment>
    );
  }
}

export default Material;