import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite';

export default class EffectCreator extends Component {
  constructor() {
    super();
    this.state = {
      basics: {
        name: '',
        type: '',
        duration: 0,
        school: '',
      },
      hpModification: {
        damage: 0,
        typeOfDamage: '',
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
      resistance: '',
    };
  }

  render() {
    return (
      <div></div>
    );
  }
}

