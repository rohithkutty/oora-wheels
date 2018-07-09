import React from "react";
import { Grid, Segment, Input, Button, Divider, Dropdown } from "semantic-ui-react";
import "../css/signup.css";
import { Link } from "react-router-dom";

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

  handleInput() {
    alert("highlighted");
  }

  render() {
    return (
      <div className="signup">
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
                    <label htmlFor="roomname">First Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="roomname"
                      type="email"
                      size="mini"
                      icon="keyboard"
                      placeholder="first name"
                      // onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">Last Name : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="roomname"
                      type="email"
                      size="mini"
                      icon="keyboard"
                      placeholder="last name"
                      // onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">Email address : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Input
                      id="roomname"
                      type="email"
                      size="mini"
                      icon="envelope"
                      placeholder="xxxx@xxxx.com"
                      // onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    verticalAlign="middle"
                    className="formList"
                  >
                    <label htmlFor="roomname">Gender : </label>
                  </Grid.Column>
                  <Grid.Column width={8} className="formValue">
                    <Dropdown placeholder='Gender' className='dropdown-signup' fluid selection options={friendOptions} />
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
                      icon="shield alternate"
                      placeholder="secret password"
                      // onChange={this.handleInput}
                      className="inputValue"
                    />
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <Link to="/dashboard">
                      <Button primary fluid>
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
