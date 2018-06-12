import Service from './service';
import axios from 'axios';

let state = new WeakMap();

class ApiService extends Service {
  constructor() {
    super('api');
    this.baseURL = `http://localhost:5000/`
    Object.freeze(this);
  }

  async get(url) {
    try {
      let response = await axios.get(`${this.baseURL}${url}`);

      return response.data;
    } catch (e) {
      return e;
    }
  }

  async post(url, data) {
    try {
      let response = await axios.post(`${this.baseURL}${url}`, data);

      return response.data;
    } catch (e) {
      return e;
    }
  }

  init() {
    return true;
  }
  
  getInstance() {
    return this;
  }
}

export default ApiService;