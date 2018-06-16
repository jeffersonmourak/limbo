import React from 'react'; 
import ServiceManager from '@services/manager';

import { Redirect } from 'react-router';

class Authenticated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unlockKey: null
    };

    this.auth = ServiceManager.getService('auth');
  }

  setUnlockKey(unlockKey) {
    this.setState({
      ...this.state,
      unlockKey
    });
  }

  unlockUser() {
    this.auth.unlockUser(this.state.unlockKey)
  }

  unlock() {
    if (this.auth.isAuthenticated() === null && !this.auth.hasSession()) {
      return <Redirect to={'/login/'}/>;
    } else if (this.auth.isAuthenticated() === null && this.auth.hasSession()) {
      return <Redirect to={'/unlock/'}/>
    } else {
      return this.props.children;
    }
  }
 
  render() {
    return (
      <div>
        { this.unlock() }
      </div>
    );
  }
}

export default Authenticated;