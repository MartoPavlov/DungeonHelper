import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Link to="/create">Create</Link>
        <h3>Under Construction..</h3>
      </div>
    );
  }
}

