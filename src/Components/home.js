import React from 'react';
import Navbar from './navbar';
// import { Segment } from 'semantic-ui-react';

class Home extends React.Component {
  render() {

  let userLoggedin = false;
    
    return (
      <div className='home'>
        <Navbar userLoggedIn={userLoggedin}/>
        This is a home Component
      </div>
    )
  }
}

export default Home;