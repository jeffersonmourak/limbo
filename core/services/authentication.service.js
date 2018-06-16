import Service from './service';
import ServiceManager from '@services/manager';
import Login from '@authentication/login';
import CryptoJS from 'crypto-js';

let state = new WeakMap();
let DEFAULT_DATA = {
  currentUser: null,
  hasSession: localStorage.getItem(`user`) || false
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

  hasSession() {
    return state.get(this).hasSession;
  }

  unlockUser(unlockKey) {
    let currentState = state.get(this);

    try {
      let currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(`user`), unlockKey).toString(CryptoJS.enc.Utf8));

      state.set(this, {
        ...currentState,
        currentUser
      });

      return true;
    } catch (e) {
      return false;
    }
  } 

  getUser() {
    return this.isAuthenticated() || {};
  }

  async login(unlockKey) {
    let currentState = state.get(this);
    try {
      let currentUser = await this.loginInstance.authenticate();
      
      state.set(this, {
        ...currentState,
        currentUser
      });

      if (unlockKey) {
        localStorage.setItem(`user`, CryptoJS.AES.encrypt(JSON.stringify(currentUser), unlockKey).toString());
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(`user`);
    state.set(this, DEFAULT_DATA);
    window.location.href = '/login';
  }

  init() {
    return true;
  }
  
  getInstance() {
    return this;
  }
}

export default AuthenticationService;