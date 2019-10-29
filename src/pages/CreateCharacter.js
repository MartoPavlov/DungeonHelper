import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {css, StyleSheet} from 'aphrodite';
import InputField from '../components/InputField';
import SelectionList from '../components/SelectionList';
import SmallInputField from '../components/SmallInputField';
import Section from '../components/Section';
import StatCounter from '../components/StatCounter';
import SpellCounter from '../components/SpellCounter';
import ModalSection from '../components/ModalSection';
import AbilityAdder from '../components/AbilityAdder';
import InventoryCreator from '../components/InventoryCreator';
import CustomButton from '../components/CustomButton';
import {STATS, SPELL_SLOTS} from '../utility/constants';
import Firebase from '../firebase/Firebase';

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

  componentDidMount() {
    if (!Firebase.auth().currentUser) {
      this.props.history.push('/');
    }
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
        <h1 className={css(styles.heading)}>Create Character:</h1>
        <Grid 
          container
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={4}>
            <Section
              title="Stats"
              fields={STATS}
              builderItem={(label) => {
                return <StatCounter label={label} />
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Section
              title="Spell Slots"
              fields={SPELL_SLOTS}
              builderItem={(label) => {
                return <SpellCounter label={label} />
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <ModalSection title="Abilities" label="ADD" width={'20%'}>
              <AbilityAdder />
            </ModalSection>
            <ModalSection title="Inventory" label="ADD" width={'20%'}>
              <InventoryCreator />
            </ModalSection>
          </Grid>
        </Grid>
        <div className={css(styles.separator)}></div>
        <CustomButton className={styles.createButton}>
          CREATE
        </CustomButton>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ec2127',
    marginBottom: 100,
    textAlign: 'center'
  },
  separator: {
    marginLeft: '5%',
    width: '90%',
    border: '1px solid #aaa',
    marginTop: 100,
    marginBottom: 10,
  },
  createButton: {
    display: 'block',
    textAlign: 'center',
  }
});

