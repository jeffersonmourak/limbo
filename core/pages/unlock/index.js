import React from 'react'; 
import ServiceManager from '@services/manager';

// Components
import { Redirect } from 'react-router';
import Input from '@components/Input';

// Style
import './unlock.css';

class Unlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unlock: false
    };

    this.auth = ServiceManager.getService('auth');
  }
 
  unlock(key) {
    if (this.auth.unlockUser(key)) {
      this.setState({
        unlock: true
      });
    }
  }

  render() {
    return (
      <div className={`unlock-content`}>
        { this.state.unlock ? <Redirect to={`/`} /> : '' }
        <div className={`title`}> Limbo </div>
        <div>
          <p> Type the unlock key </p>
          <Input type={`password`} onChange={ value => this.unlock(value) } />
        </div>
      </div>
    );
  }
}

export default Unlock;