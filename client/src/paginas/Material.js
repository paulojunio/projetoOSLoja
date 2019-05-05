import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './cssStyle.css';


class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material : []
    };

    this.addItem = this.addItem.bind(this);
    console.log(this.state)
  }

  addItem() {
    const obj = {'nome': this.newNomeMaterial.value, 'quantidade': this.newQuantidadeMaterial.value};
    this.setState({
      material: [...this.state.material, obj]
    })
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
          <form>
              <h3>Nome do material</h3>
              <input ref={input => this.newNomeMaterial = input} type="text" name="nome_material" placeholder="Exemplo: linha" className="form-control" id="form-login"/>
              <h3>Quantidade desse material</h3>
              <input ref={input => this.newQuantidadeMaterial = input} type="number" name="quantidade_material" placeholder="Somente números" className="form-control" id="form-login"/>
          </form>
        </div>
        </div>
        <div className="container-ask">
                <button onClick={this.addItem} name="adicionar_material" className="btn btn-sign-up center-block pull-left">Adicionar material</button>
                <Link to={{ 
                    pathname: '/roupa', 
                    state: { material: this.state.material}}}>
                    <button type="submit" name="proximo_passo" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
                </Link>
        </div> 
      
    </React.Fragment>
    );
  }
}

export default Material;