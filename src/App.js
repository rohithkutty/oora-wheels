import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Components/login";
import Home from "./Components/home";
import SignUp from "./Components/signup";
import Dashboard from "./Components/dashboard";
import ErrorPage from "./Components/error";
import ForgotPassword from "./Components/forgotPassword";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/error" component={ErrorPage} />
              <Route path="/forgotPassword" component={ForgotPassword} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
