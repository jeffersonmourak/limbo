import React from 'react';
import ServiceManager from '@services/manager';

// Components
import Button from '@components/Button';

// Style
import './Device.css';

class Device extends React.Component {
  constructor() {
    super();

    this.auth = ServiceManager.getService('auth');
    this.user = this.auth.getUser();
    this.api = ServiceManager.getService('api');

  }

  async foundDevice(deviceId) {
    try{
      await this.api.post('found-device', {
        deviceId,
        userId: this.user.id
      }, true);
    } catch (e) {
      return;
    }
  }

  async deleteDevice(deviceId) {
    try{
      await this.api.delete('lost-devices', {
        deviceId
      }, true);
    } catch (e) {
      return;
    }

    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  render() {
    return (
      <div className={`device`} key={ this.props.device.id }>
        <div className={`details`}>
          <img className={`picture`} src={ this.props.device.photo || `http://www.bluproducts.com/android-phones/images/phone-placeholder.png` } />
          <span className={`name`} >{ this.props.device.name || 'UNKNOWN' }</span>
        </div>
        <div className={`action`}>
          { 
            !this.props.disableFoundButton ?
            <Button theme={`card-action found`} onClick={ () => { this.foundDevice(this.props.device.id) } }> Found! </Button> :
            <Button theme={`card-action delete`} onClick={ () => { this.deleteDevice(this.props.device.id) } }> Delete! </Button>
          }
        </div>
      </div>
    )
  }
}

export default Device;