import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import IndexPage from './components/pages/Index-Page';
import Historial from "./components/historial";
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router history={Historial}>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
