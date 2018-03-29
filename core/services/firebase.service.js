import Service from './service';
import * as firebase from "firebase";

class FirebaseService extends Service {
  constructor() {
    super('firebase');

    this.config = {
      apiKey: "AIzaSyB7iFyskq8to40G2FP_J6EbsZfu8Z_-vwY",
      authDomain: "limbo-199316.firebaseapp.com",
      databaseURL: "https://limbo-199316.firebaseio.com",
      projectId: "limbo-199316",
      storageBucket: "limbo-199316.appspot.com",
      messagingSenderId: "483807082940"
    };
  }

  init() {
    return firebase.initializeApp(this.config);
  }
  
  getInstance() {
    return firebase;
  }
}

export default FirebaseService;