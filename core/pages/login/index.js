import React from 'react'; 
import ServiceManager from '@services/manager';

// Components
import Button from '@components/Button';
import Input from '@components/Input';
import Checkbox from '@components/Checkbox';

// Style
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepLogged: false,
      unlockKey: null
    };
    this.auth = ServiceManager.getService('auth');
  }

  async login() {
    try {
      await this.auth.login(this.state.unlockKey);
      this.props.history.push('/');
    } catch (e) {
      return null;
    }
  }

  setKeepLogged(keepLogged) {
    this.setState({
      ...this.state,
      keepLogged
    });
  }

  setUnlockKey(unlockKey) {
    this.setState({
      ...this.state,
      unlockKey
    });
  }

  render() {
    return (
      <div className={`login-page`}>
        <div className={`line-container`}>
          <h1 className={`title`}>Limbo</h1>
        </div>
        <div className={`line-container`}>
          <div>
            <Button onClick={() => this.login()}> Login </Button>
          </div>
          { this.state.keepLogged ?
            <div>
              <Input type={`password`}
                     placeholder={`Set Unlock Key`}
                     onChange={ value => this.setUnlockKey(value) } />
            </div>:
             '' }
          <div>
            <Checkbox onChange={ value => this.setKeepLogged(value) } label={`Keep logged?`} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;