import React from 'react';
import logo from './logo.svg';
import { Router, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import DirectMessage from './components/DirectMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/directmessage' component={DirectMessage} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
