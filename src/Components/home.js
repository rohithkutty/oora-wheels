import React from 'react';
import Navbar from './navbar';
import { Grid } from 'semantic-ui-react';

class Home extends React.Component {
  render() {

    let userLoggedin = false;

    return (
      <div className='home'>
        <Navbar userLoggedIn={userLoggedin} />
        This is a home Component
        <Grid>
          <Grid.Row columns={4}>
            
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Home;