import React, {Component} from 'react';
import './cssStyle.css';
import axios from 'axios';

class Roupa extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      roupa : [],
      todosMateriais : this.props.location.state.material,
      valor : 'Material'
    }

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    const obj = {'nome': this.newNomeMaterial.value, 'quantidade': this.newQuantidadeMaterial.value};
    this.setState({
      roupa: [...this.state.roupa, obj]
    })
  }
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
              <input ref={input => this.newNomeRoupa = input} type="text" name="nome_roupa" placeholder="Exemplo: Vestido de seda" className="form-control" id="form-login"/> 
              <h3>Tempo de confecção (Horas)</h3>
              <input ref={input => this.newTempoConfec = input} type="number" name="tempo_confecc_em_horas" placeholder="Somente números" className="form-control" id="form-login"/>
              <h3>Lucro obtido na venda (R$)</h3>
              <input ref={input => this.newLucroObtido = input} type="number" name="lucro_obtido" placeholder="Exemplo: 50.00" className="form-control" id="form-login"/> 
              
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
          <select value={this.state.valor} name="materiais" className="form-control" id="form-login">
            {this.state.todosMateriais.map(function(d, idx){
                  return (<option key={idx}>{d.nome}</option>)
            })}
          </select>
          <h3>Quantidade</h3>
          <input ref={input => this.newQuantidadeMaterialUsa = input} type="number" name="quantidade_material" placeholder="Exemplo: 50.00" className="form-control" id="form-login"/> 
          <button type="submit" name="adicionar_material" className="btn btn-sign-up center-block">Adicionar material</button>
        </div>
      </div>
      <div className="container-ask">
        <button name="adicionar_roupa" className="btn btn-sign-up center-block pull-left">Adicionar roupa</button>
        <a href="/confeccao">
        <button name="proximo_passo" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
        </a>
     </div>
     
     </React.Fragment>
    );
  }
}

export default Roupa;