import React from 'react'; 
import ServiceManager from '@services/manager';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.auth = ServiceManager.getService('auth');
  }

  login = async () => {
    try {
      await this.auth.login();
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.login}> Login </button>
      </div>
    );
  }
}

export default Login;