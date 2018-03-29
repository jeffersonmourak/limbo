import ServiceManager from '@services/manager';
import User from '@authentication/user';

import * as firebase from "firebase";
class Login {
  constructor() {
    this.firebase = ServiceManager.getService('firebase');
    
    if (this.firebase === null) {
      throw new Error('Firebase not initialized yet');
      return;
    }

    this.firebase.auth().languageCode = 'pt_BR';
    this.initProvider();
  }

  initProvider() {
    this.provider = new this.firebase.auth.FacebookAuthProvider();
    this.provider.addScope('email');
    this.provider.addScope('public_profile');
    this.provider.setCustomParameters({
      'display': 'popup'
    });
  }

  async authenticate() {
    try {
      let result = await this.firebase.auth().signInWithPopup(this.provider),
          profile = result.additionalUserInfo.profile;

      return new User(profile.name, profile.email, profile.picture.data.url, profile.id);
    } catch (e) {
      return null;
    }
  }
}

export default Login;
