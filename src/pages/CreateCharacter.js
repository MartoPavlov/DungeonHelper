import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {css, StyleSheet} from 'aphrodite';
import {connect} from 'react-redux';
import { withSnackbar } from 'notistack';
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
import Text from '../components/Text';
import {STATS, SPELL_SLOTS} from '../utility/constants';
import Firebase from '../firebase/Firebase';
import {
  resetStats, resetSpellSlots, deleteAllAbilities, deleteInventory
} from '../redux/index';

/**
 * Page responsible for creating new characters in the users' account
 */
class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      level: 1,
      hp: {curr: 0, max: 0},
      error: '',
    };

    this.handleOnNameChanged = this.handleOnNameChanged.bind(this);
    this.handleOnLevelChanged = this.handleOnLevelChanged.bind(this);
    this.handleOnHPChange = this.handleOnHPChange.bind(this);
    this.handleOnCreateCharacterClick = this.handleOnCreateCharacterClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) {
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
    const hp = this.state.hp;
    hp.curr = newHP;
    hp.max = newHP;
    this.setState({
      hp: hp,
    });
  }

  handleOnCreateCharacterClick() {
    const {name, level, hp} = this.state;
    const {stats, spells, abilities, inventory, user} = this.props;
    const currentCharacter = {
      name: name,
      level: level,
      hp: {curr: hp.curr, max: hp.max},
      stats: stats,
      spells: spells,
      abilities: abilities,
      inventory: inventory,
    };

    if (this.characterIsInValid()) {
      console.log('Here');
      this.fireAnError('Invalid character');
      return;
    }
    
    Firebase.database().ref('/characterInfo/'+user.uid+'/'+name)
      .set(currentCharacter).then(() => {
        this.props.resetRedux();
        this.props.history.push('/select');
        this.props.enqueueSnackbar('Character created succesfuly!',
         {variant: 'success'});
    }).catch((error) => {
      this.fireAnError(error.message);
    });
  }

  characterIsInValid() {
    const {name} = this.state;
    const hp = this.state.hp.max;
    const {abilities, inventory} = this.props;

    if (!name) {
      this.fireAnError('The name field is emptry');
    }
    if (Number.isInteger() && hp.max <= 0) {
      this.fireAnError('The HP must a possitive number');
    }
    if (abilities.length === 0) {
      this.fireAnError('The character must have at least one ability');
    }
    if (inventory.length === 0) {
      this.fireAnError('The character must have at least one item');
    }
    
    return !name || hp.max <= 0 || abilities.length === 0 || inventory.length === 0;
  }

  fireAnError(error) {
    this.props.enqueueSnackbar(error, {variant: 'error'});
  }

  render() {
    // creates an array with the numbers from 1 to 20
    const levels = Array.from({length: 20}, (v, number) => number + 1);

    return (
      <div>
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
              value={this.state.hp.max}
              onChange={this.handleOnHPChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Section
              className={styles.stats}
              title="Stats"
              fields={STATS}
              builderItem={(label) => {
                return <StatCounter label={label} />
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Section
              className={styles.spells}
              title="Spell Slots"
              fields={SPELL_SLOTS}
              builderItem={(label) => {
                return <SpellCounter label={label} />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='flex-start' justify='center'>
              <Grid item xs={3}>
                <ModalSection
                  className={styles.modalSection}
                  title="Abilities"
                  label="ADD"
                  width={200}
                >
                  <AbilityAdder />
                </ModalSection>
              </Grid>
              <Grid item xs={3}>
                <ModalSection
                  className={styles.modalSection}
                  title="Inventory"
                  label="ADD"
                  width={200}
                >
                  <InventoryCreator />
                </ModalSection>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={css(styles.separator)}></div>
        <CustomButton
          onClick={this.handleOnCreateCharacterClick}
          className={styles.createButton}
          width={'25%'}
        >
          Create
        </CustomButton>
        <Text className={styles.error}>{this.state.error}</Text>
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
    marginTop: 30,
    marginBottom: 10,
  },
  error: {
    fontStyle: 'italic',
  },
  createButton: {
    display: 'block',
    textAlign: 'center',
  },
  stats: {
    textAlign: 'right'
  },
  spells: {
    textAlign: 'left',
  },
  modalSection: {
    marginTop: 40,
    marginBottom: 40,
  }
});

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
    spells: state.spells,
    abilities: state.abilities.abilities,
    inventory: state.inventory.inventory,
    user: state.user.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetRedux: () => {
      dispatch(resetStats());
      dispatch(resetSpellSlots());
      dispatch(deleteAllAbilities());
      dispatch(deleteInventory());
    }
  }
}

export default 
  withSnackbar(connect(mapStateToProps, mapDispatchToProps)(CreateCharacter));
