import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

class Material extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const response = await api.get('/material');
    
    const responseMessage = response.data.express;

    this.setState({ response: responseMessage });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Material;