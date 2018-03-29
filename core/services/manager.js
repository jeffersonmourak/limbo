let applicationsServices;
class ServiceManager {
  static addService(name, fn) {
    if (!applicationsServices) {
      applicationsServices = {};
    }
    if (applicationsServices[name]) {
      throw new Error('Service Already Exists!');
      return;
    }
    
    applicationsServices[name] = fn;
  }

  static getService(name) {
    if (!applicationsServices || !applicationsServices[name]) {
      return null;
    }

    return applicationsServices[name].getInstance();
  }

  static addFromServices(list) {
    for (let service of list) {
      let serviceInstance = new service();

      ServiceManager.addService(serviceInstance.name, serviceInstance);
      serviceInstance.init();
    }
  }

}

export default ServiceManager;