import React from "react";
import {
  Grid,
  Segment,
  Input,
  Form,
  Button,
  Divider,
  Header,
  Message,
  Label
} from "semantic-ui-react";
import "../css/login.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

var userRegistered = false;

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      errorAppeared: false,
      userLoggedIn: false,
      userExist: false,
      incorrectDetails: false,
      userRegistered: false,
      invalidEmail: false,
      invalidPass: false
    };
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
  }

  handleEmailInput(e) {
    if (e.target.value) {
      let email = e.target.value;
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(pattern)) {
        this.setState({
          [e.target.name]: e.target.value,
          invalidEmail: false
        });
        document.getElementById('username').style.borderColor = "grey";
      } else {
        this.setState({
          invalidEmail: true
        });
        document.getElementById('username').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidEmail: false
      })
      document.getElementById('username').style.borderColor = "grey";
    }
  }

  handlePasswordInput(e) {
    if (e.target.value) {
      var pswd = e.target.value;
      var pswdLen = pswd.length;
      if (pswdLen > 5) {
        this.setState({
          [e.target.name]: e.target.value,
          invalidPass: false
        });
        document.getElementById('password').style.borderColor = "grey";
      } else {
        this.setState({
          invalidPass: true
        });
        document.getElementById('password').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidPass: false
      })
      document.getElementById('password').style.borderColor = "grey";
    }
  }

  hidePopUp() {
    setTimeout(function () {
      this.setState({ errorAppeared: false });
      document.getElementById('username').style.borderColor = "grey";
      document.getElementById('password').style.borderColor = "grey";
    }.bind(this), 3000)
  }

  handleSubmit(e) {
    e.preventDefault();
    const login = {
      email: this.state.username,
      password: this.state.password
    };

    if (login.email && login.password) {
      fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(login)
      })
        .then(res => res.json())
        .then(user => {
          if (user.success === true) {
            this.props.history.push({
              pathname: '/dashboard',
              state: { loggedIn: true }
            })
          } else if (user.message === "User not found") {
            this.setState({
              userExist: true
            })

            setTimeout(function () {
              this.setState({ userExist: false });
            }.bind(this), 3000)

          } else if (user.message === "Password incorrect") {
            this.setState({
              incorrectDetails: true
            })

            setTimeout(function () {
              this.setState({ incorrectDetails: false });
            }.bind(this), 3000)
          }
        })
        .catch(err => {
          if (err) {
            this.props.history.push("/error");
          }
        });
    } else {
      this.setState({
        errorAppeared: true
      })

      if (!login.username) {
        document.getElementById('username').style.borderColor = "red";
      } else {
        document.getElementById('username').style.borderColor = "grey";
      }

      if (!login.password) {
        document.getElementById('password').style.borderColor = "red";
      } else {
        document.getElementById('password').style.borderColor = "grey";
      }

      this.hidePopUp();
    }

  }

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.registered === true) {
        this.setState({
          userRegistered: true
        })
      }
      setTimeout(function () {
        this.setState({ userRegistered: false });
      }.bind(this), 3000)
    }
  }

  render() {
    document.title = "OORA Wheels | Login";

    return (
      <div className="login">
        <Navbar userLoggedIn={this.state.userLoggedIn} />
        <Grid>
          <Grid.Row id='loginBlock'>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <Segment raised>
                <Grid className="loginForm">
                  <Grid.Column width={16}>
                    {(this.state.errorAppeared === true) && (
                      <Message
                        id='errorMessage'
                        negative
                        header='Note: Mandatory fields missing'
                        content='Please fill all the fields to login'>
                      </Message>
                    )}
                    {(this.state.userRegistered === true) && (
                      <Message
                        id='successMessage'
                        success
                        header='Note: User registered successfully'
                        content='Please enter the credentials to login'>
                      </Message>
                    )}
                    {(this.state.userExist === true) && (
                      <Message
                        id='errorMessage'
                        negative
                        header='Note: Email ID not registered'
                        content='Click on create account to get registered'>
                      </Message>
                    )}
                    {(this.state.incorrectDetails === true) && (
                      <Message
                        id='errorMessage'
                        negative
                        header='Note: Email ID / password incorrect'
                        content='Please re-check your login details'>
                      </Message>
                    )}
                    <Header as="h2" icon textAlign="center">
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
                      icon="envelope"
                      placeholder="email address"
                      onChange={this.handleEmailInput}
                      className="inputValue"
                      required
                    />
                  </Grid.Column>
                  {(this.state.invalidEmail === true) && (
                    <Grid.Column width={2}>
                      <Label id='emailValidation' pointing='left'>Invalid email</Label>
                    </Grid.Column>
                  )}
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
                      icon="shield alternate"
                      placeholder="secret password"
                      onChange={this.handlePasswordInput}
                      className="inputValue"
                      required
                    />
                  </Grid.Column>
                  {(this.state.invalidPass === true) && (
                    <Grid.Column width={2}>
                      <Label id='passwordValidation' pointing='left'>Password should be minimum 6 digits</Label>
                    </Grid.Column>
                  )}
                  <Grid.Column width={8}>
                    <Form.Checkbox
                      className="checkbox-remember"
                      label="Remember me"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Link to="/forgotPassword" className="forgotPassword">
                      Forgot password?
                    </Link>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Button type='submit' primary fluid onClick={this.handleSubmit}>
                      Login
                    </Button>
                    <Divider horizontal>Or</Divider>
                    <Link to="/signup">
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
