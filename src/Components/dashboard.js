import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import Navbar from './navbar';
// import SidebarMenu from './sidebar';
import '../css/dashboard.css';
import CarComponent from './carComponent';

const cars = [
  {
    id: 1,
    name: "Swift Desire",
    model: "2015",
    img: "https://media.zigcdn.com/media/model/2017/May/dire_600x300.jpg",
    desc: "New model swift desire car"
  },
  {
    id: 2,
    name: "Tata Indica",
    model: "2015",
    img: "https://auto.ndtvimg.com/car-images/big/tata/indica/tata-indica.jpg?v=7",
    desc: "New model swift desire car"
  },
  {
    id: 3,
    name: "Jaquar",
    model: "2015",
    img: "https://imgd.aeplcdn.com/1280x720/cw/ec/14152/Jaguar-XE-Right-Front-Three-Quarter-65731.jpg?wm=0&t=152409487&t=152409487&q=100",
    desc: "New model swift desire car"
  },
  {
    id: 4,
    name: "Swift Normal",
    model: "2015",
    img: "https://mlab.com/base/img/mLab-logo-dark.svg",
    desc: "New model swift desire car"
  }
];

export default class Dashboard extends React.Component {

  render() {

    if (this.props.location.state) {
      var isLoggedIn = this.props.location.state.loggedIn;
    }

    let carItems;

    if (cars.length > 0) {
      carItems = cars.map(car => {
        return (
          <Grid.Column>
            <CarComponent key={cars.id} cars={car} />
          </Grid.Column>
        );
      });
    }

    return (
      <div>
        <Navbar userLoggedIn={isLoggedIn} />
        <Grid>
          <Grid.Row>
            {/* <Grid.Column width={3} id="menubar">
              <SidebarMenu />
            </Grid.Column> */}
            <Grid.Column width={16}>
              <Header as='h2' icon textAlign='center'>
                <Header.Content>Dashboard</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            {carItems}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

