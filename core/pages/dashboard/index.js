import React from 'react'; 
import ServiceManager from '@services/manager';
import Authenticated from '@pages/authenticated';

// Components
import { Link } from 'react-router-dom';
import TopBar from '@components/TopBar';
import Button from '@components/Button';

// Style
import './dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.auth = ServiceManager.getService('auth');
    this.user = this.auth.getUser();
  }

  render() {
    return (
      <Authenticated>
        <TopBar leftButton={<Link to="/lost/new"><Button theme={`clear`}> New Device </Button></Link>}
                subtitle={`Hello, ${this.user.name}!`}/>
        <div className={`action-menu`}>
          <Link to="/lost">
            <Button>Lost devices</Button>
          </Link>
          <Link to="/lost/my">
            <Button>My Lost devices</Button>
          </Link>
        </div>
      </Authenticated>
    );
  }
}

export default Dashboard;