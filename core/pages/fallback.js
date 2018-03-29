import React from 'react'; 
import Authenticated from '@pages/authenticated';
import { Link } from 'react-router-dom';

class Fallback extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1> 404 </h1>
      <p> This page does not exists. <Link to="/"> Go back </Link> </p>
      </div>
    );
  }
}

export default Fallback;