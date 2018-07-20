import React from 'react';
import { Card, Image, Rating, Button, Icon, Popup } from 'semantic-ui-react';

const CarComponent = (props) => (
  <Card className="carCard">
    <Image className="carImage" src={props.cars.img} />
    <Card.Content>
      <Card.Header style={{ 'textAlign': 'center' }}>{props.cars.name}</Card.Header>
      <Card.Meta>
        <div id='carSelect'>
          <Popup size='mini' trigger={<Rating id='carRating' icon='heart' size='large' defaultRating={props.cars.rating} maxRating={5} />}>
            Rating: {props.cars.rating}
          </Popup>
          <Button color='green' id='bookNow'>
            Book Now
          </Button>
        </div>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default CarComponent;
