import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import IndexPage from './components/pages/Index-Page';
import SearchingPage from './components/pages/SearchingPage';
import Historial from "./components/historial";
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router history={Historial}>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route exact path="/busqueda" component={SearchingPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
