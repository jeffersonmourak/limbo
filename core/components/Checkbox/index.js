import React from 'react';

// Style
import './Checkbox.css';

class Checkbox extends React.Component {
  static defaultProps = {
    label: '',
    onChange: () => {}
  }

  onChangeValue(e) {
    this.props.onChange(e.target.checked);
  }

  render() {
    return <label className={`checkbox-container`}>
      <input type={`checkbox`} onChange={ e => this.onChangeValue(e) }/>
      <div className={`checkbox`} ></div>
      <div className={`label`}>{ this.props.label }</div>
    </label>
  }
}

export default Checkbox;