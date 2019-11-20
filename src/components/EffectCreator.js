import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css, StyleSheet} from 'aphrodite';
import {addEffect} from  '../redux/index';

class EffectCreator extends Component {
  constructor() {
    super();
    this.state = {
      basics: {
        name: '',
        type: '',
        /* Effects types:
          blinded, charmed, deafened, fatigued, frightened, grappled, 
          incapacitated, invisible, paralyzed, petrified, poisoned,
          prone, restrained, stunned, unconscious, exhaustion, buff,
          curse
         */
        duration: 0,
      },
      hpModification: {
        damage: 0,
        typeOfDamage: '',
        /* Types of damage:
          acid, bludgeoning, cold, fire, force, lightning, necrotic, piercing,
          poison, psychic, radiant, slashing, thunder
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
  }

  render() {
    return (
      <div></div>
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
