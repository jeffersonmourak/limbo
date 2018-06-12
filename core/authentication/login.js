import ServiceManager from '@services/manager';
import User from '@authentication/user';
import * as firebase from "firebase";
class Login {
  constructor() {
    this.firebase = ServiceManager.getService('firebase');
    this.api = ServiceManager.getService('api');

    if (this.firebase === null) {
      throw new Error('Firebase not initialized yet');
      return;
    }

    if (this.api === null) {
      throw new Error('Api not initialized yet');
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
          profile = result.additionalUserInfo.profile,
          user = await this.api.post('login', {
            name: profile.name,
            email: profile.email,
            photo: profile.picture.data.url,
            uid: profile.id
          });
      
      return new User(user.name, user.email, user.photo, user.uid, user.id);
    } catch (e) {
      return null;
    }
  }
}

export default Login;
