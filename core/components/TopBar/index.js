import React from 'react';
import ServiceManager from '@services/manager';

// Components
import Button from '@components/Button';
import { Link } from 'react-router-dom';

// Style
import './TopBar.css';

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.auth = ServiceManager.getService('auth');
  }

  static defaultProps = {
    leftButton: <Link to="/"><Button theme={`clear`}> Back </Button></Link>
  }

  render() {
    return <div className={`topBar-container`}>
      <div className={`topBar`}>
        <div className={`left`}>
          {this.props.leftButton}
        </div>
        <div className={`center`}>Limbo</div>
        <div className={`right`}>
          <Button theme={`clear`} onClick={ () => this.auth.logout() } > Logout </Button>
        </div>
      </div>
      <div className={`subtitle`}>
        {this.props.subtitle}
      </div>
    </div>
  }
}

export default TopBar;