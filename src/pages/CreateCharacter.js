import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {css, StyleSheet} from 'aphrodite';
import {connect} from 'react-redux';
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
    console.log(currentCharacter);

    if (!this.characterIsValid) {
      this.setState({
        error: 'Invalid Character!',
      });
      return;
    }
    
    Firebase.database().ref('/characterInfo/'+user.uid+'/'+name)
      .push(currentCharacter).then(() => {
        this.props.resetRedux();
        this.props.history.push('/select');
    }).catch((error) => {
      this.setState({
        error: error.massage,
      });
    });
  }

  characterIsValid() {
    const {name} = this.state;
    const hp = this.state.hp.max;
    const {abilities, inventory} = this.props;
    
    return name && hp > 0 && abilities.length > 0 && inventory > 0;
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
        <CustomButton
          onClick={this.handleOnCreateCharacterClick}
          className={styles.createButton}
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
    marginLeft: '5%',
    width: '90%',
    border: '1px solid #aaa',
    marginTop: 100,
    marginBottom: 10,
  },
  error: {
    fontStyle: 'italic',
  },
  createButton: {
    display: 'block',
    textAlign: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter)
