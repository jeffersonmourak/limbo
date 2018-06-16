import React from 'react';

// Components
import Button from '@components/Button';

// Style
import './Upload.css';

class Upload extends React.Component {
  constructor() {
    super();

    this.state = {
      value: null
    }
  }

  static defaultProps = {
    onChange: () => {}
  }

  onUpload(e) {
    let file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = e => {
      this.setState({
        ...this.state,
        value: e.target.result
      });

      this.props.onChange(e.target.result);
    };

    reader.onerror = e => {
      this.removeImage();
      this.props.onChange(null);
    }

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.setState({
      ...this.state,
      value: null
    });
  }

  openDialog() {
    this.fileInput.click();
  }

  render() {
    return (
      <div>
        { this.state.value ?
          <div className={`upload-preview`} >
            <img src={ this.state.value } /> 
            <Button onClick={ () => this.removeImage() } >X</Button>
          </div>:
          <div className={`upload-button`}>
            <Button onClick={ () => this.openDialog() } > Upload Image! </Button>

            <input ref={ input => { this.fileInput = input } } 
                   type={'file'} 
                   onChange={ e => this.onUpload(e) } 
                   accept={'image/*'}/>
          </div>
        }
      </div>
    )
  }
}

export default Upload;