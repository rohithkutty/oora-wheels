import React from 'react';
import Navbar from './navbar';
// import { Segment } from 'semantic-ui-react';

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Navbar />
        This is a home Component
      </div>
    )
  }
}

export default Home;