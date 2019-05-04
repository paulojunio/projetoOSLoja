import React, {Component} from 'react';
import './cssStyle.css';
import axios from 'axios';

class Confeccao extends Component {
  
  /*
  otimizar = async () => {
        let responseMessage = '';
        
        await api.post("/otimizar", this.state).then((response) => {
           //pegar respostas
        });
        
        this.setState({
            //setar respostas
        })
    };

    handleSubmit = (event) => {
        this.otimizar();
        event.preventDefault();
    };*/
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
                <form action="post">
                    <h3>Número de costureiras</h3>
                    <input type="number" name="numero_costureiras" placeholder="Somente números" className="form-control" id="form-login"/>
                    <h3>Tempo de trabalho (Horas)</h3>
                    <input type="number" name="tempo_trabalho" placeholder="Somente números" className="form-control" id="form-login"/>
                    
                </form>
            </div>
            </div>
            <div className="container-ask">
            <a href="/resultado">
            <button type="submit" name="encontrar_lucro" className="btn btn-sign-up center-block" id="botao-centro">Encontrar melhor lucro</button>
            </a>
            </div> 
     </React.Fragment>
    );
  }
}

export default Confeccao;