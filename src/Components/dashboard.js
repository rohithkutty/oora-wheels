import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const Dashboard = (props) => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content>Dashboard</Header.Content>
    </Header>
  </div>
)

export default Dashboard;
