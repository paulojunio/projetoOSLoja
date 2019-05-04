import React, {Component} from 'react';
import './cssStyle.css';
import api from '../api';


class Confeccao extends Component {
  constructor(props) {
      super(props); 
      this.state = {
        todasRoupas : this.props.location.state.roupas,
        materiaisUtilizados: this.props.location.state.todosMateriaisPassados,
        tempoTotalConf: '',
        quantidadeCostu: '',
        respostas: ''
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleQuantidadeCostChange = this.handleQuantidadeCostChange.bind(this);
      this.handleTempoConfChange = this.handleTempoConfChange.bind(this);
      console.log(this.state);
      //console.log(this.props.location.state);
  }

    handleTempoConfChange = (event) => (
        this.setState({
           tempoTotalConf: event.target.value,
        })
    );
    handleQuantidadeCostChange = (event) => (
        this.setState({
            quantidadeCostu: event.target.value,
        })
    );
  
  otimizar = async () => {
        let respostaBack = '';
        
        await api.post("/otimizar", this.state).then((response) => {
           respostaBack = response.data.optimization;
        });
        
        this.setState({
            respostas: respostaBack
        })
    };

    handleSubmit = (event) => {
        this.otimizar();
        event.preventDefault();
    };
  render() {
    return (
        <React.Fragment>
        <div className = "containerFundo" id="fundo">
            <div className = "container">
                <h1>
                Confecção das roupas
                </h1>
            </div>
            <div className="containerNew">
                <form>
                    <h3>Número de costureiras</h3>
                    <input onChange={this.handleQuantidadeCostChange} value={this.state.cost} type="number" name="numero_costureiras" placeholder="Somente números" className="form-control" id="form-login"/>
                    <h3>Tempo de trabalho (Horas)</h3>
                    <input onChange={this.handleTempoConfChange} value={this.state.tempoConfecc} type="number" name="tempo_trabalho" placeholder="Somente números" className="form-control" id="form-login"/>
                    
                </form>
            </div>
            </div>
            <div className="container-ask">
                <button onClick={this.handleSubmit} name="encontrar_lucro" className="btn btn-sign-up center-block" id="botao-centro">Encontrar melhor lucro</button>
            </div> 
            <div className="containerNew">
                {this.state.respostas}
            </div>
     </React.Fragment>
    );
  }
}

export default Confeccao;