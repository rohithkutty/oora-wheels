import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const CarComponent = (props) => (
  <Card className="carCard">
    <Image className="carImage" src={props.cars.img} />
    <Card.Content>
      <Card.Header>{props.cars.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.cars.model}</span>
      </Card.Meta>
      <Card.Description>{props.cars.desc}</Card.Description>
    </Card.Content>
  </Card>
)

export default CarComponent;
