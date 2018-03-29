class Service {
  constructor(name) {
    this.name = name;
  }

  init() {
    return true;
  }

  getInstance() {
    return this;
  }
}

export default Service;