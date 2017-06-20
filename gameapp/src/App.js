import React, { Component } from 'react';
import logo from './logo.svg';

import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

import './App.css';
//import './main.js';
import BattleArea from './battleArea.js';


class App extends Component {
 
  render() {
    
    return (
      <div className="App">
        <BattleArea />
        <input id='playerName' type='text'/>
        <button>submit</button>
      </div>
    );
  } 
}
export default App; 
