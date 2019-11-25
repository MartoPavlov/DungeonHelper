import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack';
import {addEffect} from  '../redux/index';
import CustomHeading from './CustomHeading';
import InputField from './InputField';
import SelectionList from './SelectionList';
import SmallInputField from './SmallInputField';
import If from './If';
import LabeledCheckbox from './LabeledCheckbox';
import LebeledCounter from './LebeledCounter';
import CustomList from './CustomList';
import CustomButton from './CustomButton';
import {EFFECT_TYPES, DAMAGE_TYPES, STATS} from '../utility/constants';
import CustomTitle from './CustomTitle';
import Firebase from '../firebase/Firebase';
import PropTypes from 'prop-types';

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
        currentStacks: 1,
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
      resistance: 'none', // like the damage types
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleMaxStacksChange = this.handleMaxStacksChange.bind(this);
    this.handleLiniarStackingClick = this.handleLiniarStackingClick.bind(this);
    this.handleDamageChange = this.handleDamageChange.bind(this);
    this.handleDamageTypeChange = this.handleDamageTypeChange.bind(this);
    this.handlePernamentHpChange = this.handlePernamentHpChange.bind(this);
    this.handleIncrementing = this.handleIncrementing.bind(this);
    this.handleDecrementing = this.handleDecrementing.bind(this);
    this.handleResistanceChange = this.handleResistanceChange.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
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
    if (isNaN(basics.duration)) basics.duration = 0;
    this.setState({
      basics: basics,
    })
  }

  handleMaxStacksChange(text) {
    const {basics} = this.state;

    basics.maxStacks = Number(text);
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

  handlePernamentHpChange(text) {
    const {hpModification} = this.state;

    hpModification.pernamentHp = Number(text);
    this.setState({
      hpModification: hpModification,
    });
  }

  handleIncrementing(event) {
    const {stats} = this.state;
    const stat = this.getStatFromEvent(event);

    stats[stat]++;
    this.setState({
      stats: stats,
    });
  }

  handleDecrementing(event) {
    const {stats} = this.state;
    const stat = this.getStatFromEvent(event);

    stats[stat]--;
    this.setState({
      stats: stats,
    });
  }

  handleResistanceChange(text) {
    this.setState({
      resistance: text,
    });
  }

  handleConfirmClick() {
    if (this.effectIsValid()) {
      this.addEffectInDatabase();
      this.props.enqueueSnackbar('Succesfuly added the effect',
        {variant: 'success'});
    }
  }

  getStatFromEvent(event) {
    try {
      return event.currentTarget.parentElement.parentElement.children[0]
        .textContent.toLowerCase();
    } catch(error) {
      console.warn('Getting stat failed!!');
      return 'Nope';
    }
  }

  /**
   * name(string !== null)
   * type(string, auto validated by selection)
   * duration(number > 0)
   * maxStacks(number > 0)
   * liniarStacking(bool, auto validated by checkbox)
   * damage(number)
   * damageType(string, auto validated by selection)
   * pernamentHp(number)
   * stats(number, validated by counter)
   * resistance(string, auto validated by selection)
   * @return {Boolean}
   */
  effectIsValid() {
    const {basics, hpModification} = this.state;
    const {name, duration, maxStacks} = basics;
    const {damage, pernamentHp} = hpModification;
    let valid = true;

    if (!name) {
      this.fireAnError('The name field is empty');
      valid = false;
    }
    if (isNaN(duration) || duration <= 0) {
      this.fireAnError('The duration field must be a number greater than 0');
      valid = false;
    }
    if (isNaN(maxStacks) || maxStacks <= 0) {
      this.fireAnError('The max stacks field must be a number greater than 0');
      valid = false;
    }
    if (isNaN(damage)) {
      this.fireAnError('The damage field must be a number');
      valid = false;
    }
    if (isNaN(pernamentHp)) {
      this.fireAnError('The pernament hp field must be a number');
      valid = false;
    }
    return valid;
  }

  hasThisEffect(name, effects) {
    for (let i=0; i<effects.length; i++) {
      if (name === effects[i].basics.name) {
        return true;
      }
    }
    return false;
  }

  /**
   * Use this function only if hasThisEffect returns true!
   * If the effect is stackable this function will increace the number of
   * current stacks and also reset the duration. If not only resets the
   * duration
   * @param {Object} effect 
   * @param {Array} effects
   * @return {Array} changed effects
   * @see hasThisEffect
   */
  stackAndResetEffect(effect, effects) {
    const {basics} = effect;

    for (let i=0; i<effects.length; i++) {
      const effectsBasics = effects[i].basics;

      if (basics.name === effectsBasics.name) {
        if (effectsBasics.currentStacks < effectsBasics.maxStacks) {
          effectsBasics.currentStacks++;
        }
        effectsBasics.duration = 
            Math.max(basics.duration, effectsBasics.duration);
        effects[i] = effectsBasics;
      }
    }
    return effects;
  }

  addEffectInDatabase() {
    // later change this to player's uid
    const user = this.props.user.uid;
    const character = this.props.character;
    const state = this.state;
    let val;

    Firebase.database().ref('testing/'+user+'/'+character).once('value', (data) => {
      val = data.val();

      if (!val) return;
      if (!val.effects) {
        val.effects = [];
        val.effects.push(state);
      } else {
        if (this.hasThisEffect(state.basics.name, val.effects)) {
          val = {
            ...val, effects: this.stackAndResetEffect(state, val.effects)
          };
        } else {
          val.effects.push(state);
        }
      }
      Firebase.database().ref('testing/'+user+'/'+character).set(val).then(() => this.resetState())
      .catch((error) => console.warn(error.message));
    });
  }

  resetState() {
    console.log('Here');
    const basics = {
      name: '',
      type: 'none',
      duration: 0,
      maxStacks: 1,
      liniarStacking: false,
    };
    const hpModification = {
      damage: 0,
      typeOfDamage: 'none',
      pernamentHp: 0,
    };
    const stats = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intellect: 0,
      wisdom: 0,
      charisma: 0,
    };
    this.setState({
      basics: basics,
      hpModification: hpModification,
      stats: stats,
      resistance: 'none',
    });
  }

  fireAnError(error) {
    this.props.enqueueSnackbar(error, {variant: 'error'});
  }

  render() {
    const {basics, hpModification, stats, resistance} = this.state;
    const {name, type, duration, maxStacks, liniarStacking} = basics;
    const {damage, typeOfDamage, pernamentHp} = hpModification;

    return (
      <div>
        <CustomHeading>
          Effect Creation
        </CustomHeading>
        <Grid container justify='center'>
          <Grid item xs={5}>
            <CustomTitle className={styles.sectionTitle}>
              Basic Information
            </CustomTitle>
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
              className={styles.smallInputFields}
              label='Duration'
              value={duration}
              onChange={this.handleDurationChange}
            />
            <SmallInputField
              className={styles.smallInputFields}
              label='Max Stacks'
              value={maxStacks}
              onChange={this.handleMaxStacksChange}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTitle className={styles.sectionTitle}>
              Damage Information
            </CustomTitle>
            <SmallInputField
              className={styles.smallInputFields}
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
            <SmallInputField
              className={styles.smallInputFields}
              label="Pernament HP"
              value={pernamentHp}
              onChange={this.handlePernamentHpChange}
            />
            <If condition={maxStacks>1}>
              <LabeledCheckbox
                label="Liniar Stacking"
                size={15}
                checked={liniarStacking} 
                onClick={this.handleLiniarStackingClick}
              />
            </If>
          </Grid>
        </Grid>
        <CustomTitle className={styles.sectionTitle}>
          Stat Change Information
        </CustomTitle>
        <CustomList
          width='100%'
          itemSize={30}
          height={185}
          data={STATS}
          renderItem={(stat) => {
            return (
              <LebeledCounter
                label={stat}
                value={stats[stat.toLowerCase()]}
                increment={this.handleIncrementing}
                decrement={this.handleDecrementing}
                min={-999}
              />
            );
          }}
        />
        <CustomTitle className={styles.sectionTitle}>
          Resistance Information
        </CustomTitle>
        <SelectionList
          label="Resistance"
          items={DAMAGE_TYPES}
          onChange={this.handleResistanceChange}
          value={resistance}
        />
        <CustomButton
          className={styles.confirmButton}
          onClick={this.handleConfirmClick}
          fontSize={14}
          >
          ADD
        </CustomButton>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 25,
  },
  smallInputFields: {
    marginTop: 10,
    marginBottom: 10,
  },
  confirmButton: {
    display: 'inline-block',
    marginTop: 7,
    marginBottom: 7,
  }
});

EffectCreator.propTypes = {
  character: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    effects: state.effects.effects,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEffect: (effect) => dispatch(addEffect(effect)),
  };
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(EffectCreator));
