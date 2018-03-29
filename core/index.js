import ServiceManager from '@services/manager';
import FirebaseService from '@services/firebase.service';
import AuthenticationService from '@services/authentication.service';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { render } from 'react-dom';
import React from 'react'; 

// PAGES

import Login from '@pages/login';
import Dashboard from '@pages/dashboard';
import Fallback from '@pages/fallback';

class Application extends React.Component {
  constructor() {
    super();

    ServiceManager.addFromServices([FirebaseService, AuthenticationService]);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/login' component={Login}/>
          <Route component={Fallback}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

render(<Application/>, document.getElementById('app'));