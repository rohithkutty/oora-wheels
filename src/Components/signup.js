import React from "react";
import { Grid, Segment, Input, Button, Divider, Dropdown, Header, Message } from "semantic-ui-react";
import "../css/signup.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const friendOptions = [
  {
    text: 'Male',
    value: 'male',
    icon: 'mars',
  },
  {
    text: 'Female',
    value: 'female',
    icon: 'venus',
  },
  {
    text: 'Others',
    value: 'others',
    icon: 'transgender',
  }
]

class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      password: '',
      errorAppeared: false,
      emailExist: false,
      userLoggedIn: false
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

    var genderValue = document.getElementsByName('gender')[0].innerText;

    const registerUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gender: genderValue,
      password: this.state.password
    }

    console.log(registerUser);

    if (registerUser.firstname && registerUser.lastname && registerUser.email && registerUser.gender && registerUser.password) {
      fetch('http://localhost:3034/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(registerUser)
      })
        .then(res => res.json())
        .then((newUser) => {
          if (newUser.message === 'registered') {
            this.props.history.push({
              pathname: '/login',
              state: { registered: true }
            })
          } else if (newUser.message === 'email already exists') {
            this.setState({
              emailExist: true
            })
          }
        })
        .catch((err) => {
          if (err) {
            this.props.history.push('/error')
          }
        })
    } else {
      this.setState({
        errorAppeared : true
      })
    }
  }

  render() {

    document.title = "OORA Wheels | Sign up";

    return (
      <div className="signup">
        <Navbar userLoggedIn={this.state.userLoggedIn}/>
        <Grid>
          <Grid.Row id='signUpBlock'>
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
                        content='Please fill all the fields to register'>
                      </Message>
                    )}
                    {(this.state.emailExist === true) && (
                      <Message
                        id='errorMessage'
                        negative
                        header='Note: Email already exists'
                        content='Please enter new email to register / visit forgot password page'>
                      </Message>
                    )}
                    <Header as='h2' icon textAlign='center'>
                      <Header.Content>Sign Up</Header.Content>
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="first-name">First Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="first-name"
                      type="email"
                      size="mini"
                      icon="keyboard"
                      name="firstname"
                      placeholder="first name"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="last-name">Last Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="last-name"
                      type="email"
                      size="mini"
                      icon="keyboard"
                      name="lastname"
                      placeholder="last name"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="email">Email address : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="email"
                      type="email"
                      size="mini"
                      icon="envelope"
                      name="email"
                      placeholder="xxxx@xxxx.com"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="Gender">Gender : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Dropdown name='gender' placeholder='Gender' className='dropdown-signup' fluid selection options={friendOptions} />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="password">Password : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="password"
                      type="password"
                      size="mini"
                      icon="shield alternate"
                      name="password"
                      placeholder="secret password"
                      onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Link to="/dashboard" >
                      <Button primary fluid onKeyPress={this.handleSubmit} onClick={this.handleSubmit}>
                        Create Account
                      </Button>
                    </Link>
                    <Divider horizontal>Or</Divider>
                    <Link to="/login">
                      <Button secondary fluid>
                        Already having an account ?
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

export default SignUp;
