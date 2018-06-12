import Login from './login';

class User {
  constructor(name, email, photo, uid, id) {
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.uid = uid;
    this.id = id;
  }
}

export default User;