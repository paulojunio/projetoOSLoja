import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Material from './paginas/Material';
import Roupa from './paginas/Roupa';
import Confeccao from './paginas/Confeccao';
//import Confeccao from './paginas/Confeccao';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/roupa" component={Roupa} />
            <Route path="/confeccao" component={Confeccao} />
           
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
//serviceWorker.unregister();
