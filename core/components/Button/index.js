import React from 'react';

// Style
import './Button.css';

class Button extends React.Component {
  static defaultProps = {
    theme: 'default'
  }

  render() {
    return <button className={`limbo-button theme-${this.props.theme}`} 
                   { ...this.props } >
      { this.props.children }
    </button>
  }
}

export default Button;