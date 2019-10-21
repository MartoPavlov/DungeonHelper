import React, {Component} from 'react';
import InputField from '../components/InputField/InputField';

export default class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="container">
        <InputField label="Name" />
      </div>
    );
  }
}

