import React, {Component} from 'react';
import {connect} from 'react-redux';

class Character extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    const name = this.props.location.state.name;
    
    return (
      <div>{name}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.stats.Strength,
  };
}

export default connect(mapStateToProps, null)(Character)
