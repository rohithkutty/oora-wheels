import React from "react";
import { Grid, Segment, Input, Button, Divider, Dropdown, Header, Message, Label } from "semantic-ui-react";
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
      userLoggedIn: false,
      invalidFname: false,
      invalidLname: false,
      invalidEmail: false,
      invalidGender: false,
      invalidPass: false
    }
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleFnameInput = this.handleFnameInput.bind(this);
    this.handleLnameInput = this.handleLnameInput.bind(this);
    this.handleGenderInput = this.handleGenderInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // First name validation
  handleFnameInput(e) {
    if (e.target.value) {
      let fname = e.target.value;
      var pattern = /^[A-Z]+$/i;
      if (fname.match(pattern)) {
        this.setState({
          [e.target.name]: e.target.value,
          invalidFname: false
        });
        document.getElementById('first-name').style.borderColor = "grey";
      } else {
        this.setState({
          invalidFname: true
        });
        document.getElementById('first-name').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidFname: false
      })
      document.getElementById('first-name').style.borderColor = "grey";
    }
  }

  // Last name validation
  handleLnameInput(e) {
    if (e.target.value) {
      let lname = e.target.value;
      var pattern = /^[A-Z]+$/i;
      if (lname.match(pattern)) {
        this.setState({
          [e.target.name]: e.target.value,
          invalidEmail: false
        });
        document.getElementById('last-name').style.borderColor = "grey";
      } else {
        this.setState({
          invalidEmail: true
        });
        document.getElementById('last-name').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidEmail: false
      })
      document.getElementById('last-name').style.borderColor = "grey";
    }
  }

  // Email validation
  handleEmailInput(e) {
    if (e.target.value) {
      let email = e.target.value;
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(pattern)) {
        this.setState({
          [e.target.name]: e.target.value,
          invalidEmail: false
        });
        document.getElementById('email').style.borderColor = "grey";
      } else {
        this.setState({
          invalidEmail: true
        });
        document.getElementById('email').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidEmail: false
      })
      document.getElementById('email').style.borderColor = "grey";
    }
  }

  // Gender validation
  handleGenderInput(e) {
    if (document.getElementsByName('gender')[0].innerText) {
      let gender = document.getElementsByName('gender')[0].innerText;
      if (gender !== 'Gender' ) {
        this.setState({
          invalidGender: false
        });
        document.getElementById('gender').style.borderColor = "grey";
      } else {
        this.setState({
          invalidGender: true
        });
        document.getElementById('gender').style.borderColor = "red";
      }
    } else {
      this.setState({
        invalidGender: false
      })
      document.getElementById('gender').style.borderColor = "grey";
    }
  }

  // Password validation
  handlePassInput(e) {
    if (e.target.value) {
      let pswd = e.target.value;
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
      if (pswd.match(pattern)) {
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

  handleSubmit(e) {
    e.preventDefault();

    var genderValue = document.getElementsByName('gender')[0].innerText;

    const registerUser = {
      name: this.state.firstname + this.state.lastname,
      email: this.state.email,
      gender: genderValue,
      password: this.state.password
    }

    console.log(registerUser);

    if (registerUser.name && registerUser.email && registerUser.gender && registerUser.password) {
      fetch('http://localhost:5000/api/users/register', {
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

            setTimeout(function () {
              this.setState({ emailExist: false });
            }.bind(this), 3000)
          }
        })
        .catch((err) => {
          if (err) {
            this.props.history.push('/error')
          }
        })
    } else {
      this.setState({
        errorAppeared: true
      })

      if (this.state.firstname) {
        document.getElementById('first-name').style.borderColor = 'grey';
      } else {
        document.getElementById('first-name').style.borderColor = 'red';
      }

      if (this.state.lastname) {
        document.getElementById('last-name').style.borderColor = 'grey';
      } else {
        document.getElementById('last-name').style.borderColor = 'red';
      }

      if (registerUser.email) {
        document.getElementById('email').style.borderColor = 'grey';
      } else {
        document.getElementById('email').style.borderColor = 'red';
      }

      if (registerUser.gender === 'Gender') {
        document.getElementById('gender').style.borderColor = 'grey';
      } else {
        document.getElementById('gender').style.borderColor = 'red';
      }

      if (registerUser.password) {
        document.getElementById('password').style.borderColor = 'grey';
      } else {
        document.getElementById('password').style.borderColor = 'red';
      }

      setTimeout(function () {
        this.setState({ errorAppeared: false });
        document.getElementById('first-name').style.borderColor = 'grey';
        document.getElementById('last-name').style.borderColor = 'grey';
        document.getElementById('email').style.borderColor = 'grey';
        document.getElementById('gender').style.borderColor = 'grey';
        document.getElementById('password').style.borderColor = 'grey';
      }.bind(this), 3000)
    }
  }

  render() {

    document.title = "OORA Wheels | Sign up";

    return (
      <div className="signup">
        <Navbar userLoggedIn={this.state.userLoggedIn} />
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
                      onChange={this.handleFnameInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  {(this.state.invalidFname === true) && (
                    <Grid.Column width={2}>
                      <Label id='emailValidation' pointing='left'>Enter only alphabets</Label>
                    </Grid.Column>
                  )}
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
                      onChange={this.handleLnameInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  {(this.state.invalidLname === true) && (
                    <Grid.Column width={2}>
                      <Label id='emailValidation' pointing='left'>Enter only alphabets</Label>
                    </Grid.Column>
                  )}
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
                      onChange={this.handleEmailInput}
                      className="inputValue"
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
                    <label htmlFor="Gender">Gender : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Dropdown name='gender' placeholder='Gender' id='gender' className='dropdown-signup' fluid selection options={friendOptions} />
                  </Grid.Column>
                  {(this.state.invalidGender === true) && (
                    <Grid.Column width={2}>
                      <Label id='emailValidation' pointing='left'>Please select a value</Label>
                    </Grid.Column>
                  )}
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
                      onChange={this.handlePassInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  {(this.state.invalidPass === true) && (
                    <Grid.Column width={2}>
                      <Label id='emailValidation' pointing='left'>Should contain atleast 1 lowercase,uppercase,
                      <br/>numeric and a special character & should be 6 digit or more</Label>
                    </Grid.Column>
                  )}
                  <Grid.Column width={16}>
                    <Button primary fluid onKeyPress={this.handleSubmit} onClick={this.handleSubmit}>
                      Create Account
                      </Button>
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
