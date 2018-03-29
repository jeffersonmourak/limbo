import Service from './service';
import ServiceManager from '@services/manager';
import Login from '@authentication/login';

let state = new WeakMap();
let DEFAULT_DATA = {
  currentUser: null
}

class AuthenticationService extends Service {
  constructor() {
    super('auth');

    this.firebase = ServiceManager.getService('firebase');
    this.loginInstance = new Login();
    state.set(this, DEFAULT_DATA);

    if (this.firebase === null) {
      throw new Error("Firebase not started yet!");
      return;
    }

    Object.freeze(this);
  }

  isAuthenticated() {
    return state.get(this).currentUser;
  }

  getUser() {
    return this.isAuthenticated() || {};
  }

  async login() {
    let currentState = state.get(this);
    try {
      let currentUser = await this.loginInstance.authenticate();
      
      state.set(this, {
        ...currentState,
        currentUser
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  init() {
    return true;
  }
  
  getInstance() {
    return this;
  }
}

export default AuthenticationService;