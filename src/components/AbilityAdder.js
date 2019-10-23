import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css, StyleSheet} from 'aphrodite';
import CustomInput from './CustomInput'
import CustomSmallInput from './CustomSmallInput';
import CustomSelection from './CustomSelection';
import CustomButton from './CustomButton';
import AbilityList from './AbilityList';
import {addAbility} from '../redux/index';

class AbilityAdder extends Component {  
  constructor() {
    super();
    this.state = {
      name: '',
      uses: 0,
      cooldown: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsesChange = this.handleUsesChange.bind(this);
    this.handleCooldownChange = this.handleCooldownChange.bind(this);
    this.handleAddingAbility = this.handleAddingAbility.bind(this);
  }

  handleNameChange(text) {
    this.setState({
      name: text,
    });
  }

  handleUsesChange(text) {
    this.setState({
      uses: text,
    });
  }

  handleCooldownChange(text) {
    this.setState({
      cooldown: text,
    });
  }

  handleAddingAbility() {
    const {name, uses, cooldown} = this.state;
    const tempAbility = {
      name: name,
      uses: uses,
      maxUses: uses,
      cooldown: cooldown,
    };
    
    this.props.addAbility(tempAbility);
    this.setState({
      name: '',
      uses: 0,
      cooldown: 0,
    });
  }

  render() {
    const cooldowns = ['long rest', 'short rest'];
    const {name, uses} = this.state;

    return (
      <div>
        <div className="title">Add Ability</div>
        <span className="label">Enter Ability</span>
        <CustomInput
          value={name}
          onChange={this.handleNameChange}
        />
        <CustomSmallInput
          value={uses}
          onChange={this.handleUsesChange}
          width={30}
        />
        <CustomSelection
          items={cooldowns}
          onChange={this.handleCooldownChange}
        />
        <CustomButton onClick={this.handleAddingAbility} fontSize={14}>
          ADD
        </CustomButton>
        <AbilityList />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAbility: (ability) => dispatch(addAbility(ability))
  };
}

const styles = StyleSheet.create({
  
});

export default connect(null, mapDispatchToProps)(AbilityAdder);
