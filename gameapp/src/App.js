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
      	<div className="user-box clearboth">
      		<div className="user-one float-left">
		        <div className="player-title">Player 1</div>
		        <div>
		        	<input id='playerName' type='text' placeholder="Please Enter name"/>
		        </div>
		        	<button>submit</button>
		        
	        </div>
	        <div className="user-two float-left">
	        	 <div className="player-title">Player 2</div>
	        	 <div className="registered-user">Sai Ram</div>
	        </div>
	   	</div>
	   	<BattleArea />
      </div>
    );
  } 
}
export default App; 
