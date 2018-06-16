import React from 'react'; 
import ServiceManager from '@services/manager';

// Components
import Device from '@components/LostDevices/Device';
import Button from '@components/Button';
import Input from '@components/Input';

// Style
import './List.css';

class LostDevicesList extends React.Component {
  constructor(props) {
    super(props);
    this.api = ServiceManager.getService('api');

    this.state = {
      devices: [],
      loading: true,
      search: ''
    }
  }

  static defaultProps = {
    filter: device => true,
    disableFoundButton: false,
    enableSearchBar: false
  }

  async loadDevices(filter, forceUpdate) {
    let state = {
      ...this.state
    };

    try{
      let devices = await this.api.get('lost-devices', forceUpdate);

      state.devices = devices.filter(filter);
    } catch (e) {
      state.error = "unable to load devices";
    } finally {
      state.loading = false;
      this.setState(state);
    }
  }

  componentDidMount() {
    this.loadDevices(this.props.filter, false);
  }

  componentWillReceiveProps(props) {
    if (props.filter) {
      this.loadDevices(props.filter, false);
    }
  }

  onSearch(search) {
    this.setState({
      ...this.state,
      search
    });
  }

  filterMenu(device) {
    if (this.state.search === '') {
      return true;
    }

    return device.name.toLowerCase().includes(this.state.search.toLowerCase());
  }

  render() {
    return (
      <div>
        <div className={`list`}>
          <div className={`actions`} >
            { this.props.enableSearchBar ? 
              <Input placeholder={`Device Name`} type='text' onChange={ value => this.onSearch(value) } />:
              ''
            }
            <Button onClick={ () => this.loadDevices(this.props.filter, true) } > refresh </Button>
          </div>
          <div className={`devices`}>
            {this.state.loading ? <p> Loading... </p> : ''}
            { this.state.devices.length > 0 ?
              this.state.devices
                .filter((device) => this.filterMenu(device))
                .map( device => (
                  <Device key={ device.id }
                          device={ device } 
                          onDelete={ () => this.loadDevices(this.props.filter, true) }
                          disableFoundButton={ this.props.disableFoundButton } />
                ) ):
              <p className={`no-devices`}> No devices lost! </p> }
          </div>
        </div>
      </div>
    );
  }
}

export default LostDevicesList;