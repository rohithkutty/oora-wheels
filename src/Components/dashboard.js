import React from 'react'
import { Link } from "react-router-dom";
import { Header, Grid, Segment, Icon } from 'semantic-ui-react'
import Navbar from './navbar';
// import SidebarMenu from './sidebar';
import '../css/dashboard.css';
import CarComponent from './carComponent';
import { miniCars, sedanCars, primeCars, luxuryCars } from './stub/cars';

export default class Dashboard extends React.Component {

  render() {

    var isLoggedIn = false;

    if (this.props.location.state) {
      isLoggedIn = this.props.location.state.loggedIn;
    }

    let miniCarItems;
    let sedanCarItems;
    let primeCarItems;
    let luxuryCarItems;

    if (miniCars.length > 0) {
      miniCarItems = miniCars.map(car => {
        return (
          <Grid.Column className="carBlock">
            <CarComponent key={miniCars.id} cars={car} />
          </Grid.Column>
        );
      });
    }

    if (sedanCars.length > 0) {
      sedanCarItems = sedanCars.map(car => {
        return (
          <Grid.Column className="carBlock">
            <CarComponent key={sedanCars.id} cars={car} />
          </Grid.Column>
        );
      });
    }

    if (primeCars.length > 0) {
      primeCarItems = primeCars.map(car => {
        return (
          <Grid.Column className="carBlock">
            <CarComponent key={primeCars.id} cars={car} />
          </Grid.Column>
        );
      });
    }

    if (luxuryCars.length > 0) {
      luxuryCarItems = luxuryCars.map(car => {
        return (
          <Grid.Column className="carBlock">
            <CarComponent key={luxuryCars.id} cars={car} />
          </Grid.Column>
        );
      });
    }

    if (isLoggedIn === true) {
      return (
        <div>
          <Navbar userLoggedIn={isLoggedIn} />
          <Grid>
            <Grid.Row id='dashboardBlock'>
              <Grid.Column width={16}>
                <Header as='h2' icon textAlign='center'>
                  <Header.Content>Dashboard</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4}>
              <div id='CarParallex1' className='carParallexStyle'></div>
              <Header as='h2' className='carTitle' id='mini-cars' icon textAlign='center'>
                <Header.Content>Mini Cars</Header.Content>
              </Header>
              <Segment id="budgetSection">
                {miniCarItems}
              </Segment>
              <div id='CarParallex2' className='carParallexStyle'></div>
              <Header as='h2' className='carTitle' id='sedan-cars' icon textAlign='center'>
                <Header.Content>Sedan Cars</Header.Content>
              </Header>
              <Segment id="budgetSection">
                {sedanCarItems}
              </Segment>
              <div id='CarParallex3' className='carParallexStyle'></div>
              <Header as='h2' className='carTitle' id='prime-cars' icon textAlign='center'>
                <Header.Content>Prime Cars</Header.Content>
              </Header>
              <Segment id="budgetSection">
                {primeCarItems}
              </Segment>
              <div id='CarParallex4' className='carParallexStyle'></div>
              <Header as='h2' className='carTitle' id='luxury-cars' icon textAlign='center'>
                <Header.Content>Luxury Cars</Header.Content>
              </Header>
              <Segment id="budgetSection">
                {luxuryCarItems}
              </Segment>
              <div id='CarParallex5' className='carParallexStyle'></div>
            </Grid.Row>
          </Grid>
        </div>
      )
    }

    if (isLoggedIn === false) {
      return (
        <div>
          <Navbar userLoggedIn={isLoggedIn} />
          <div id='dashboardBlock'>
            <Header as='h2' icon textAlign='center'>
              <Icon color='red' name='attention' circular />
              <Header.Content>Oops!!!</Header.Content>
              <Header.Subheader id='sub-header'>Something has gone wrong, Please 
                <Link to='/login' id='relogin'>
                   click here
                </Link>to login again</Header.Subheader>
            </Header>
          </div>
        </div>
      )
    }
  }
}

