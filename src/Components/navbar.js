import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">
                OORA-Wheels
              </Link>
            </div>
            {(this.props.userLoggedIn === false) && (
              <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to='/signup'>
                  <span className="glyphicon glyphicon-user" /> Sign Up
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  <span className="glyphicon glyphicon-log-in" /> Login
                </Link>
              </li>
            </ul>
            )}
            {(this.props.userLoggedIn === true) && (
              <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to='/login'>
                  <span className="glyphicon glyphicon-log-out" /> Logout
                </Link>
              </li>
            </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
