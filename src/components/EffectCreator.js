import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css, StyleSheet} from 'aphrodite';
import {addEffect} from  '../redux/index';
import CustomHeading from './CustomHeading';
import InputField from './InputField';
import SelectionList from './SelectionList';
import SmallInputField from './SmallInputField';
import If from './If';
import {EFFECT_TYPES, DAMAGE_TYPES} from '../utility/constants';
import LabeledCheckbox from './LabeledCheckbox';

class EffectCreator extends Component {
  constructor() {
    super();
    this.state = {
      basics: {
        name: '',
        type: 'none',
        /* Effects types:
          blinded, charmed, deafened, fatigued, frightened, grappled, 
          incapacitated, invisible, paralyzed, petrified, poisoned,
          prone, restrained, stunned, unconscious, exhaustion, buff,
          cursen none
         */
        duration: 0,
        maxStacks: 1,
        /*
          This option is available only if maxStacks are > 1. If true can
          calculate the hpModification and stats just by using current
          values * number of stacks
         */
        liniarStacking: true,
      },
      hpModification: {
        damage: 0,
        typeOfDamage: 'none',
        /* Types of damage:
          acid, bludgeoning, cold, fire, force, lightning, necrotic, piercing,
          poison, psychic, radiant, slashing, thunder, none
         */
        pernamentHp: 0,
      },
      stats: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intellect: 0,
        wisdom: 0,
        charisma: 0,
      },
      resistance: '', // like the damage types
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleMaxStacksChange = this.handleMaxStacksChange.bind(this);
    this.handleLiniarStackingClick = this.handleLiniarStackingClick.bind(this);
    this.handleDamageChange = this.handleDamageChange.bind(this);
    this.handleDamageTypeChange = this.handleDamageTypeChange.bind(this);
  }

  handleNameChange(text) {
    const {basics} = this.state;

    basics.name = text;
    this.setState({
      basics: basics,
    });
  }

  handleTypeChange(text) {
    const {basics} = this.state;

    basics.type = text;
    this.setState({
      basics: basics,
    });
  }

  handleDurationChange(text) {
    const {basics} = this.state;

    basics.duration = Number(text);
    if (isNaN(basics.duration) || basics.duration < 0) basics.duration = 0;
    this.setState({
      basics: basics,
    })
  }

  handleMaxStacksChange(text) {
    const {basics} = this.state;

    basics.maxStacks = Number(text);
    if (text === '') {
      basics.maxStacks = '';
    } else if (isNaN(basics.maxStacks) || basics.maxStacks < 1) {
      basics.maxStacks = 1;
    }
    this.setState({
      basics: basics,
    });
  }

  handleLiniarStackingClick() {
    const {basics} = this.state;

    basics.liniarStacking = !basics.liniarStacking;
    this.setState({
      basics: basics,
    });
  }

  handleDamageChange(text) {
    const {hpModification} = this.state;

    hpModification.damage = Number(text);
    if (isNaN(hpModification.damage)) {
      hpModification.damage = 0;
    }
    this.setState({
      hpModification: hpModification,
    });
  }

  handleDamageTypeChange(text) {
    const {hpModification} = this.state;
    hpModification.typeOfDamage = text;
    this.setState({
      hpModification: hpModification,
    });
  }

  render() {
    const {basics, hpModification, stats, resistance} = this.state;
    const {name, type, duration, maxStacks, liniarStacking} = basics;
    const {damage, typeOfDamage, pernamentHp} = hpModification;
    const {
      strength, dexterity, constitution, intellect, wisdom, charisma
    } = stats;

    return (
      <div>
        <CustomHeading>Effect Creation</CustomHeading>
        <InputField
          label='Name'
          value={name}
          onChange={this.handleNameChange}
        />
        <SelectionList
          label='Type'
          items={EFFECT_TYPES}
          onChange={this.handleTypeChange}
          value={type}
        />
        <SmallInputField
          label='Duration'
          value={duration}
          onChange={this.handleDurationChange}
        />
        <SmallInputField
          label='Max Stacks'
          value={maxStacks}
          onChange={this.handleMaxStacksChange}
        />
        <If condition={maxStacks>1}>
          <LabeledCheckbox
            label="Liniar Stacking"
            size={15}
            checked={liniarStacking} 
            onClick={this.handleLiniarStackingClick}
          />
        </If>
        <SmallInputField
          label="Damage"
          value={damage}
          onChange={this.handleDamageChange}
        />
        <SelectionList
          label="Damage Type"
          items={DAMAGE_TYPES}
          onChange={this.handleDamageTypeChange}
          value={typeOfDamage}
        />
      </div>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  return {
    effects: state.effects.effects,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEffect: (effect) => dispatch(addEffect(effect)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EffectCreator);
