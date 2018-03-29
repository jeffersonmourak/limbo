import Login from './login';

class User {
  constructor(name, email, photo, uid) {
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.uid = uid;
  }
}

export default User;