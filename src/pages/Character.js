import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css, StyleSheet} from 'aphrodite';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack';
import {
  setBasicStats, loadStats, loadSpellSlots, loadAbilities, loadInventory
} from '../redux/index';
import Firebase from '../firebase/Firebase';
import CustomHeading from '../components/CustomHeading';
import LabeledStat from '../components/LabeledStat';
import ButtonSlider from '../components/ButtonSlider';
import If from '../components/If';
import LoadingScreen from '../LoadingScreen';
import CustomTitle from '../components/CustomTitle';
import CustomList from '../components/CustomList';
import SpellCaster from '../components/SpellCaster';
import ModalSection from '../components/ModalSection';
import {STATS, SPELL_SLOTS} from '../utility/constants';
import InventoryManager from '../components/InventoryManager';
import Drawer from '../components/Drawer';
import SmallInputField from '../components/SmallInputField';
import InventoryCreator from '../components/InventoryCreator';
import CustomButton from '../components/CustomButton';
import FloatingText from '../components/FloatingText';
import EffectCreator from '../components/EffectCreator';

/**
 * Page responsible for ingame character updates. Still not completed!
 * @todo Add Effects, End round, HP damage system and Level up!
 */
class Character extends Component {
  constructor() {
    super();
    this.state = {
      character: {
        level: 0,
        hp: {curr: 0, max: 0},
      },
      input: '',
      loaded: false,
      addingItem: false,
      floatingTexts: [],
      floatTextId: 0,
      shortRestInput: '',
    };

    this.changeHp = this.changeHp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.castSpell = this.castSpell.bind(this);
    this.useAbility = this.useAbility.bind(this);
    this.useItem = this.useItem.bind(this);
    this.handleShortRest = this.handleShortRest.bind(this);
    this.handleShortRestInputChange =
        this.handleShortRestInputChange.bind(this);
    this.handleLongRest = this.handleLongRest.bind(this);
    this.handleItemAdding = this.handleItemAdding.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.popFloatText = this.popFloatText.bind(this);
  }

  componentDidMount() {
    if (this.userNotAuthenticated()) {
      this.forceAuthentication();
    } else {

      const user = this.props.user;
      let charName;
      try {
        charName = this.props.location.state.name;
        if (charName.match(/[<>#./]/g)) {
          console.log('It happend!!');
          this.forceAuthentication();
        }
      } catch(error) {
        this.props.history.push('/select');
        return;
      }

      Firebase.database().ref('characterInfo/'+user.uid+'/'+charName).on('value', (data) => {
        const val = data.val();

        if (!val) return;
        const {name, hp, level, stats, spells, abilities, inventory} = val;
        const basics = {
          name: name,
          hp: hp,
          level: level,
        };
      
        // loads all the character info into the redux store
        this.props.loadAll(basics, stats, spells, abilities, inventory);
        const character = {
          name: name,
          hp: hp,
          level: level,
          stats: stats,
          spells: spells,
          abilities: abilities,
          inventory: inventory,
        };
      
        this.setState({
          character: character,
          loaded: true,
        });
      });
    }
    
  }

  /**
   * Adds or substracts hp from character then updates the info
   * in the redux store and the database
   * @param {Number} value 
   */
  changeHp(value) {
    const character = this.state.character;
    let hp = Number(character.hp.curr);
    let max = Number(character.hp.max);

    if (isNaN(hp)) hp = 0;
    value = Number(value);
    if (isNaN(value)) return;
    hp += value;
    if (hp < 0) hp = 0;
    if (hp > max) hp = max;
    character.hp.curr = hp;
    this.setState({
      character: character,
      input: '',
      shortRestInput: '',
    }, () => {
      this.floatingHpChange(value);
      this.updateCharacterInDatabase();
      this.props.loadBasics({
        name: character.name,
        level: character.level,
        hp: character.hp,
      })
    });
  }

  /**
   * Takes away a spell slot given as a parameter. Also updates
   * the redux store and the database.
   * @param {Number} level 
   */
  castSpell(level) {
    const slot = 'slot' + level;
    const character = this.state.character;
    let currUses = character.spells[slot].curr;

    if (currUses > 0) {
      currUses-=1;
      character.spells[slot].curr = currUses;
      this.setState({
        character: character,
      }, () => {
        this.updateCharacterInDatabase();
        this.props.loadSpellSlots(character.spells);
      })
    }
  }

  /**
   * Takes away one usage from an ability. Also updates the redux
   * store and the database
   * @param {String} name 
   */
  useAbility(name) {
    const character = this.state.character;
    const abilities = character.abilities;
    for (let i=0; i<abilities.length; i++) {
      if (abilities[i].name === name && abilities[i].uses > 0) {
        abilities[i].uses--;
        break;
      }
    }
    character.abilities = abilities;
    this.setState({
      character: character,
    }, () => {
      this.updateCharacterInDatabase();
      this.props.loadAbilities(character.abilities);
    });
  }

  /**
   * Removes one quantity of an item. Updates the redux store
   * and the database.
   * @param {String} name 
   */
  useItem(name) {
    const character = this.state.character;
    let inventory = character.inventory;

    for (let i=0; i<inventory.length; i++) {
      if (inventory[i].name === name) {
        inventory[i].count--;
        if (inventory[i].count === 0) {
          inventory = inventory.filter((item) => item.count > 0);
        }
        break;
      }
    }
    character.inventory = inventory;
    this.setState({
      character: character,
    }, () => {
      this.updateCharacterInDatabase();
      this.props.loadInventory(character.inventory);
    });
  }

  /**
   * Using redux as source
   */
  updateInventory(inventory) {
    const character = this.state.character;
    character.inventory = inventory;
    this.setState({
      character: character,
    }, () => this.updateCharacterInDatabase());
  }

  /**
   * Updates the database using the current state of the character
   * variable.
   */
  updateCharacterInDatabase() {
    const user = this.props.user;
    const charName = this.state.character.name;

    Firebase.database().ref('characterInfo/'+user.uid+'/'+charName)
    .update(this.state.character).then(() => {
    }).catch((error) => {
      this.fireAnError(error.message);
    });
  }

  handleInputChange(text) {
    this.setState({
      input: text,
    });
  }

  handleShortRestInputChange(text) {
    this.setState({
      shortRestInput: text,
    });
  }


  /**
   * Restores a given amount of hp taken from the shortRestInput state variable
   * and all the abilities which have a cooldown of 'short rest'
   */
  handleShortRest() {
    const hp = Number(this.state.shortRestInput);
    const character = this.state.character;
    const abilities = character.abilities;

    for(let i=0; i<abilities.length; i++) {
      if (abilities[i].cooldown === 'short rest') {
        abilities[i].uses = abilities[i].maxUses;
      }
    }
    character.abilities = abilities;
    this.setState({
      character: character,
    }, () => {
      this.updateCharacterInDatabase();
      this.props.loadAbilities(character.abilities);
      this.changeHp(hp);
    });
  }

  /**
   * Restores a character to full health, at maximum number of spell
   * slots and with all abilities available
   */
  handleLongRest() {
    const character = this.state.character;
    // HP-----------------
    character.hp.curr = character.hp.max;
    // Spells-------------
    const spells = character.spells;
    const slots = Object.keys(spells);

    for (let i=0; i<slots.length; i++) {
      if (spells[slots[i]].max > 0) {
        spells[slots[i]].curr = spells[slots[i]].max;
      } else break;
    }
    character.spells = spells;
    // Abilities----------
    const abilities = character.abilities;
    
    for (let i=0; i<abilities.length; i++) {
      abilities[i].uses = abilities[i].maxUses;
    }
    character.abilities = abilities;
    this.setState({
      character: character,
    }, () => {
      this.updateCharacterInDatabase();
      const {loadBasics, loadSpellSlots, loadAbilities} = this.props;
      const {name, level, hp} = character;

      loadBasics({
        name: name,
        level: level,
        hp: hp,
      });
      loadSpellSlots(character.spells);
      loadAbilities(character.abilities);
    });
  }

  renderLoadingScreen() {
    return <LoadingScreen height={window.innerHeight*7/9}/>;
  }

  userNotAuthenticated() {
    return !this.props.user;
  }

  forceAuthentication() {
    this.props.history.push('/');
    this.fireAnError('You need to login to view this page');
  }

  renderInventoryCreator() {
    return <InventoryCreator />;
  }

  handleItemAdding() {
    const {addingItem} = this.state;

    if (addingItem) {
      this.updateInventory(this.props.inventory);
    }
    this.setState({
      addingItem: !addingItem,
    })
  }

  fireAnError(error) {
    this.props.enqueueSnackbar(error, {variant: 'error'});
  }

  floatingHpChange(value) {
    if (value > 0) {
      this.addFloatingText('+'+value, 'positive');
    } else if (value < 0) {
      this.addFloatingText(value, 'negative');
    }
  }

  addFloatingText(message, variant) {
    let floatingTexts = this.state.floatingTexts;

    if (floatingTexts.length === 3) {
      floatingTexts = this.popFloatText();
    }
    floatingTexts.push({
      message: message,
      variant: variant,
      id: this.state.floatTextId,
    });

    this.setState((prevState) => ({
      floatingTexts: floatingTexts,
      floatTextId: prevState.floatTextId + 1,
    }));
  }

  /**
   * Pops the floatingTexts variable and returns the new value
   * @return {Array}
   */
  popFloatText() {
    const floatingTexts = this.state.floatingTexts;
    const newFloatingText = floatingTexts.slice(1, floatingTexts.length);

    return newFloatingText;
  }

  renderFloatingTexts() {
    return this.state.floatingTexts.map((text) => {
      return (
        <FloatingText
          key={text.id}
          message={text.message}
          variant={text.variant}
        />
      );
    });
  }

  render() {
    let name;
    try {
      name = this.props.location.state.name;
    } catch(error) { return <div></div>; }
    
    const {hp, level, stats, spells, abilities} = this.state.character;
    const {input, addingItem, shortRestInput} = this.state;
    const addingItemStatus = addingItem ? 'APPLY' : 'ADD';
    const floats = this.renderFloatingTexts();
    
    return (
      <div>
        <CustomHeading className={styles.name}>{name}</CustomHeading>
        <If condition={this.state.loaded} els={this.renderLoadingScreen()}>
          <Grid container justify='center' alignItems='flex-start'>
            <Grid className={css(styles.grid)} item xs={6}>
              <LabeledStat className={styles.stat} label='HP' value={Number(hp.curr)}/>
            </Grid>
            <Grid className={css(styles.grid)} item xs={6}>
              <ButtonSlider
                value={input}
                onChange={this.handleInputChange}
                onClick={this.changeHp}
              />
            </Grid>
            <Grid className={css(styles.grid)} item xs={3}>
              <CustomTitle className={styles.level}>
                Level: {level}
              </CustomTitle>
              <CustomList
                data={STATS}
                width={'100%'}
                height={180}
                itemSize={30}
                renderItem={(item) => {
                  return (
                    <CustomTitle className={styles.label}>
                      {item} - {stats[item.toLowerCase()]}
                    </CustomTitle>
                  );
                }}
              />
            </Grid>
            <Grid className={css(styles.grid)} item xs={3}>
              <CustomList
                data={SPELL_SLOTS}
                width={'100%'}
                renderItem={(item) => {
                  const spellLevelCurrentSlots = 
                      spells[item.toLowerCase().replace(' ', '')].curr;
                  const label = item + ' - ' + spellLevelCurrentSlots;
                
                  return (
                    <SpellCaster
                      className={styles.label}
                      label={label}
                      onClick={this.castSpell}
                      passedArgument={item.toLowerCase().replace('slot ', '')}
                      contition={spellLevelCurrentSlots > 0}
                    />
                  );
                }}
              />
            </Grid>
            <Grid className={css(styles.grid)} item xs={12}>
              <ModalSection label='Add Effect'>
                <EffectCreator character={name} />
              </ModalSection>
              <CustomList
                data={abilities}
                width={'100%'}
                renderItem={(item) => {
                  const name = item.name;
                  const currentUses = item.uses;
                  const label = 
                      name + ' (' + currentUses + '/' + item.maxUses + ')';
                
                  return (
                    <SpellCaster
                      className={styles.label}
                      label={label}
                      onClick={this.useAbility}
                      passedArgument={name}
                      contition={currentUses > 0}
                    />
                  );
                }}
              />
            </Grid>
            <Grid className={css(styles.grid)} item xs={12}>
              <ModalSection
                label='Inventory'
              >
                <If condition={!addingItem} els={this.renderInventoryCreator()}>
                  <InventoryManager
                    className={styles.label}
                    onClick={this.useItem}
                  />
                </If>
                <CustomButton
                  className={styles.addItemButton}
                  onClick={() => this.setState(this.handleItemAdding)}
                  fontSize={14}
                >
                  {addingItemStatus}
                </CustomButton>
              </ModalSection>
            </Grid>
            <Grid className={css(styles.grid)} item xs={12}>
              <Drawer className={styles.drawer} label='Short Rest'>
                <SmallInputField
                  label='Add HP'
                  value={shortRestInput}
                  onChange={this.handleShortRestInputChange}
                />
                <CustomButton
                  className={styles.shortRestButton}
                  onClick={this.handleShortRest}
                  width='100%'
                >
                  Confirm
                </CustomButton>
              </Drawer>
              <CustomButton
                onClick={this.handleLongRest}
              >
                Long Rest
              </CustomButton>
            </Grid>
          </Grid>
          {floats}
        </If>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    marginBottom: 80,
  },
  stat: {
    textAlign: 'right',
  },
  level: {
    display: 'block',
    textAlign: 'center',
    marginBottom: 6,
  },
  label: {
    display: 'block',
    textAlign: 'center',
    marginBottom: 6,
  },
  grid: {
    marginBottom: 40,
  },
  drawer: {
    marginBottom: 10,
  },
  shortRestButton: {
    marginTop: 7,
  },
  addItemButton: {
    display: 'inline-block',
    marginRight: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    inventory: state.inventory.inventory,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAll: (basics, stats, spells, abilities, inventory) => {
      dispatch(setBasicStats(basics));
      dispatch(loadStats(stats));
      dispatch(loadSpellSlots(spells));
      dispatch(loadAbilities(abilities));
      dispatch(loadInventory(inventory));
    },
    loadBasics: (basics) => dispatch(setBasicStats(basics)),
    loadSpellSlots: (spells) => dispatch(loadSpellSlots(spells)),
    loadAbilities: (abilities) => dispatch(loadAbilities(abilities)),
    loadInventory: (inventory) => dispatch(loadInventory(inventory)),
  }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Character));
