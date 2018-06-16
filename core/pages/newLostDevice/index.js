import React from 'react'; 
import Authenticated from '@pages/authenticated';
import ServiceManager from '@services/manager';

// COMPONENTS
import Upload from '@components/Upload';
import Input from '@components/Input';
import Button from '@components/Button';
import { Link } from 'react-router-dom';
import TopBar from '@components/TopBar';

// Style
import './newLostDevice.css';

class MyLostDevices extends React.Component {
  constructor(props) {
    super(props);
    
    this.auth = ServiceManager.getService('auth');
    this.api = ServiceManager.getService('api');
    this.user = this.auth.getUser();

    this.state = {
      saved: false,
      data: {
        owner: this.user.id
      }
    }
  }

  onDataChange(field, value) {
    let data = {
      ...this.state.data
    };

    data[field] = value;

    this.setState({
      ...this.state,
      data
    });
  }

  async saveDevice() {
    let state = {
      ...this.state
    };

    try{
      await this.api.post('lost-devices', this.state.data, true);
      state.saved = true;
      this.setState(state);
    } catch (e) {
      state.error = "unable to load devices";
      this.setState(state);
    }
  }

  render() {
    return (
      <Authenticated>
        <TopBar subtitle={`new device`}/>

        {
          this.state.saved ? 
          <div className={`form-container`} >
            Saved!
            <Link to={'/'}>
              <Button> Back! </Button>
            </Link> 
          </div>:
          <div className={`form-container`} >
            { this.state.error }
            <Input placeholder={`Device Name`} type='text' onChange={ value => this.onDataChange('name', value) } />
            <Upload onChange={ value => this.onDataChange('photo', value) }/>
            <Button onClick={ () => this.saveDevice() } > Save </Button>
          </div>
        }
      </Authenticated>
    );
  }
}

export default MyLostDevices;