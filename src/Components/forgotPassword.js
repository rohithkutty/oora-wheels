import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react';

import Navbar from './navbar';

import '../css/forgot.css';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false
    }
  }

  render() {
    return (
      <div>
        <Navbar userLoggedIn={this.state.userLoggedIn} />
        <Grid>
          <Grid.Row id='forgotBlock'>
            <Grid.Column width={4} />
            <Grid.Column width={8}>
              <Segment raised>
                hello
              </Segment>
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
