import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './Components/login';
import Home from './Components/home';
import SignUp from './Components/signup';
import Dashboard from './Components/dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              <li className="navigation-bar">
                <ul>
                  <Link to='/login'>Login</Link>
                </ul>
                <ul>
                  <Link to='/signup'>Signup</Link>
                </ul>
              </li>

              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
