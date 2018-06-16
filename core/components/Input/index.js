import React from 'react';

// Style
import './Input.css';

class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      value: null
    }
  }

  static defaultProps = {
    onChange: () => {}
  }

  onDataChange(e) {
    this.setState({
      ...this.state,
      value: e.target.value
    });

    this.props.onChange(e.target.value);
  }

  render() {
    return <input className={'limbo-input'} {...this.props} onChange={ e => this.onDataChange(e) } />
  }
}

export default Input;