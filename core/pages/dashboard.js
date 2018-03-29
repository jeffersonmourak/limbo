import React from 'react'; 
import ServiceManager from '@services/manager';
import Authenticated from '@pages/authenticated';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.auth = ServiceManager.getService('auth');
    this.user = this.auth.getUser();
  }

  render() {
    return (
      <Authenticated>
        <h1> Hello, { this.user.name } </h1>
      </Authenticated>
    );
  }
}

export default Dashboard;