import React, {Component} from 'react';

import './paginas/cssStyle.css';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nomMaterial: ['io'],
      quaMaterial: ['12'],
      material : []
    };

    this.addItem = this.addItem.bind(this);
    console.log(this.state)
  }

  addItem() {
   
    var nomMaterial = [...this.state.nomMaterial];
    var quaMaterial = [...this.state.quaMaterial];
    const obj = {'nome': this.newNomeMaterial.value, 'quantidade': this.newQuantidadeMaterial.value};
    this.setState({
      material: [...this.state.material, obj]
    })
    nomMaterial.push(this.newNomeMaterial.value);
    quaMaterial.push(this.newQuantidadeMaterial.value);
    this.setState({nomMaterial});
    this.setState({quaMaterial});
    //console.log(this.state.material.nome);
    //console.log(this.state.material[1].quantidade);
  }
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
          
              <h3>Nome do material</h3>
              <input ref={input => this.newNomeMaterial = input} type="text" name="nome_material" placeholder="Exemplo: linha" className="form-control" id="form-login"/>
              <h3>Quantidade desse material</h3>
              <input ref={input => this.newQuantidadeMaterial = input} type="number" name="quantidade_material" placeholder="Somente números" className="form-control" id="form-login"/>
              <div className="container-ask">
                <button onClick={this.addItem} name="adicionar_material" className="btn btn-sign-up center-block pull-left">Adicionar material</button>
                <button type="submit" name="proximo_passo" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
              </div>
              <div>
              {this.state.material.map(function(d, idx){
                  return (<li key={idx}>nome: {d.nome} quantidade: {d.quantidade}</li>)
              })}
              </div>
        </div>
      </div>
       
    </React.Fragment>
    );
  }
}

export default App;