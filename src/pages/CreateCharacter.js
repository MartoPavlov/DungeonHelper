import React, {Component} from 'react';
import InputField from '../components/InputField';
import SelectionList from '../components/SelectionList';
import SmallInputField from '../components/SmallInputField';
import StatCounter from '../components/StatCounter';

export default class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      level: 0,
      hp: 0,
      stats: {
        Strength: 8,
        Dexterity: 8,
        Constitution: 8,
        Intellect: 8,
        Wisdom: 8,
        Charisma: 8,
      }
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
    const levels = Array.from({length: 20}, (v, number) => number + 1);

    return (
      <div className="container">
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
        <StatCounter label="Strength" />
      </div>
    );
  }
}

