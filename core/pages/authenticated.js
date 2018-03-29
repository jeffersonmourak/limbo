import React from 'react'; 
import ServiceManager from '@services/manager';

import { Redirect } from 'react-router'

class Authenticated extends React.Component {
  constructor(props) {
    super(props);
    this.auth = ServiceManager.getService('auth');
  }
 
  render() {
    return (
      <div>
        {
          this.auth.isAuthenticated() === null ? 
          <Redirect to={'/login/'}/>:
          this.props.children
        }
      </div>
    );
  }
}

export default Authenticated;