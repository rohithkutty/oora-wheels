import React from "react";
import { Grid, Segment, Input, Form, Button, Divider, Header } from "semantic-ui-react";
import "../css/login.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: '',
      valid: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const login = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('http://localhost:3034/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(user => this.setState({ valid : [user] }))
  }

  render() {

    document.title = "OORA Wheels | Login";

    if((this.state.valid).length > 0){
      let validate = this.state.valid;
      console.log(validate[0].message);
    }

    return (
      <div className="login">
        <Navbar />
        <Grid>
          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <Segment raised>
                <Grid className="loginForm">
                  <Grid.Column width={16}>
                    <Header as='h2' icon textAlign='center'>
                      <Header.Content>Login</Header.Content>
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">User Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="username"
                      type="email"
                      size="mini"
                      name="username"
                      icon='envelope'
                      placeholder="email address"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">Password : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="password"
                      type="password"
                      size="mini"
                      name="password"
                      icon='shield alternate'
                      placeholder="secret password"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Checkbox
                      className="checkbox-remember"
                      label="Remember me"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Link to="/" className="forgotPassword">
                      Forgot password?
                    </Link>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Link to="/dashboard" >
                      <Button primary fluid onClick={this.handleSubmit}>
                        Login
                    </Button>
                    </Link>
                    <Divider horizontal>Or</Divider>
                    <Link to="/signup" >
                      <Button secondary fluid>
                        Create an Account ?
                      </Button>
                    </Link>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
