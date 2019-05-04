import React, {Component} from 'react';
import './cssStyle.css';
import { Link } from 'react-router-dom'


class Roupa extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      roupas : [],
      todosMateriaisPassados: [],
      todosMateriais : this.props.location.state.material,
      valor : this.props.location.state.material[0].nome,
      usaMateriais: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.addMateriais = this.addMateriais.bind(this);
    this.addRoupa = this.addRoupa.bind(this);
  }

  addMateriais() {
    const obj = {'nome': this.state.valor, 'quantidade': this.newQuantidadeMaterialUsa.value};
    this.setState({
      usaMateriais: [...this.state.usaMateriais, obj]
    })
  }
  addRoupa() {
    const obj = {'nome': this.newNomeRoupa.value, 'tempoConf': this.newTempoConfec.value, 'lucro' : this.newLucroObtido.value, materiaisUsados: this.state.usaMateriais};
    this.setState({
      roupas: [...this.state.roupas, obj],
      usaMateriais: []
    })
    var novoArray = this.state.todosMateriais.slice();
    this.setState({
      todosMateriaisPassados: novoArray
    })
    //console.log(this.state.roupas)
  }
  handleChange(event) {
    this.setState({valor: event.target.value});
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
          <div className = "container">
              <h1>
                Materias da roupa
              </h1>
            </div>
        <div className = "containerNew">
          <h3>Nome do material</h3>
          <select value={this.state.valor} onChange={this.handleChange} name="materiais" className="form-control" id="form-login">
            {this.state.todosMateriais.map(function(d, idx){
                  return (<option key={idx} value={d.nome}>{d.nome}</option>)
            })}
          </select>
          <h3>Quantidade</h3>
          <input ref={input => this.newQuantidadeMaterialUsa = input} type="number" name="quantidade_material" placeholder="Exemplo: 50.00" className="form-control" id="form-login"/> 
          <button onClick={this.addMateriais} type="submit" name="adicionar_material" className="btn btn-sign-up center-block">Adicionar material</button>
        </div>
      </div>
      <div className="container-ask">
        <button onClick={this.addRoupa} name="adicionar_roupa" className="btn btn-sign-up center-block pull-left">Adicionar roupa</button>
        <Link to={{ 
                    pathname: '/confeccao', 
                    state: { todosMateriaisPassados : this.state.todosMateriaisPassados, 
                             roupas: this.state.roupas 
                            }}}>
        <button name="proximo_passo" className="btn btn-sign-up center-block pull-right">Proximo passo</button>
        </Link>
     </div>
     <h1>{this.state.valor}</h1>

     <div>
              {this.state.usaMateriais.map(function(d, idx){
                  return (<li key={idx}>nome: {d.nome} quantidade: {d.quantidade}</li>)
              })}
     </div>

     
     </React.Fragment>
    );
  }
}

export default Roupa;