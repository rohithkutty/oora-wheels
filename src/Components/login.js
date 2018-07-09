import React from "react";
import { Grid, Segment, Input, Form, Button, Divider } from "semantic-ui-react";
import "../css/login.css";
import { Link } from "react-router-dom";

class Login extends React.Component {
  handleInput() {
    alert("highlighted");
  }

  render() {
    return (
      <div className="login">
        <Grid>
          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <Segment raised>
                <Grid className="loginForm">
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">User Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="roomname"
                      type="email"
                      size="mini"
                      icon='envelope'
                      placeholder="email address"
                      // onChange={this.handleInput}
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
                      id="roomname"
                      type="password"
                      size="mini"
                      icon='shield alternate'
                      placeholder="secret password"
                      // onChange={this.handleInput}
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
                      <Button primary fluid>
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
