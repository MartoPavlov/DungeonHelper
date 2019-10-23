import React, {Component} from 'react';
import InputField from '../components/InputField';
import SelectionList from '../components/SelectionList';
import SmallInputField from '../components/SmallInputField';
import Section from '../components/Section';
import StatCounter from '../components/StatCounter';
import SpellCounter from '../components/SpellCounter';
import {STATS, SPELL_SLOTS} from '../utility/constants';
import ModalSection from '../components/ModalSection';

export default class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      level: 0,
      hp: 0,
    };

    this.handleOnNameChanged = this.handleOnNameChanged.bind(this);
    this.handleOnLevelChanged = this.handleOnLevelChanged.bind(this);
    this.handleOnHPChange = this.handleOnHPChange.bind(this);
  }

  handleOnNameChanged(newName) {
    this.setState({
      name: newName,
    });
  }

  handleOnLevelChanged(newLevel) {
    this.setState({
      level: newLevel,
    });
  }

  handleOnHPChange(newHP) {
    this.setState({
      hp: newHP,
    });
  }

  render() {
    // creates an array with the numbers from 1 to 20
    const levels = Array.from({length: 20}, (v, number) => number + 1);

    return (
      <div className="container">
        <h1 style={{color: '#ec2127', marginBottom: 100}}>Create Character</h1>
        <InputField
          label="Name"
          value={this.state.name}
          onChange={this.handleOnNameChanged}
        />
        <SelectionList
          label="Level"
          items={levels}
          onChange={this.handleOnLevelChanged}
        />
        <SmallInputField
          label="HP"
          value={this.state.hp}
          onChange={this.handleOnHPChange}
        />
        <Section
          title="Stats"
          fields={STATS}
          builderItem={(label) => {
            return <StatCounter label={label} />
          }}
        />
        <Section
          title="Spell Slots"
          fields={SPELL_SLOTS}
          builderItem={(label) => {
            return <SpellCounter label={label} />
          }}
        />
        <ModalSection title="Abilities" label="Add">
          
        </ModalSection>
      </div>
    );
  }
}

