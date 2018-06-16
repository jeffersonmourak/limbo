import Service from './service';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';

let cache = {};

class ApiService extends Service {
  constructor() {
    super('api');
    this.baseURL = `http://localhost:5000/api/`;

    Object.freeze(this);
  }

  getCacheKey(method, url, data) {
    return sha256(`${method}-${url}-${JSON.stringify(data)}`).toString();
  }

  getURLCache(method, url, data) {
    let cacheData = cache[this.getCacheKey(method, url, data)],
        nowTime = new Date * 1;

    if (!cacheData) {
      return false;
    }

    if (nowTime > (cacheData.updatedAt + 300000)) {
      return false;
    }

    return cacheData.response;
  }

  saveURLCache(method, url, data, response) {
    let cacheKey = this.getCacheKey(method, url, data);
    
    cache[cacheKey] = {
      updatedAt: new Date * 1,
      response
    };
  }

  async request(method, url, data, noCache) {
    let urlCache = this.getURLCache(method, url, data);

    if (!noCache && urlCache) {
      return urlCache;
    }

    try {
      let response = await axios({
        method,
        url: `${this.baseURL}${url}`,
        data
      });

      this.saveURLCache(method, url, data, response.data);
      
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async get(url, noCache) {
    return await this.request('get', url, undefined, noCache);
  }

  async post(url, data, noCache) {
    return await this.request('post', url, data, noCache);
  }

  async delete(url, data, noCache) {
    return await this.request('delete', url, data, noCache);
  }

  init() {
    return true;
  }
  
  getInstance() {
    return this;
  }
}

export default ApiService;