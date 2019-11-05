import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import Grid from '@material-ui/core/Grid';
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
import {STATS, SPELL_SLOTS} from '../utility/constants';

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
      ref: null,
    };

    this.changeHp = this.changeHp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.castSpell = this.castSpell.bind(this);
  }

  componentDidMount() {

    const user = this.props.user;
    const charName = this.props.location.state.name;

    const ref = Firebase.database().ref('characterInfo/'+user+'/'+charName).on('value', (data) => {
      const val = data.val();
      
      if (!val) return;
      const {name, hp, level, stats, spells, abilities, inventory} = val;
      const basics = {
        name: name,
        hp: hp,
        level: level,
      };
  
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
    this.setState({
      ref: ref,
    })
  }

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
    }, () => {
      this.updateCharacterInDatabase();
    });
  }

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
      })
    }
  }

  updateCharacterInDatabase() {
    const user = this.props.user;
    const charName = this.state.character.name;

    Firebase.database().ref('characterInfo/'+user+'/'+charName)
    .update(this.state.character).then(() => {
      console.log('Done')
    }).catch((error) => {
      console.error(error.massage);
    });
  }

  handleInputChange(text) {
    this.setState({
      input: text,
    });
  }

  renderLoadingScreen() {
    return <LoadingScreen height={window.innerHeight*7/9}/>;
  }

  render() {
    const name = this.props.location.state.name
    const {hp, level, stats, spells, abilities} = this.state.character;
    const {input} = this.state;
    
    return (
      <div>
        <CustomHeading className={styles.name}>{name}</CustomHeading>
        <If condition={this.state.loaded} els={this.renderLoadingScreen()}>
          <Grid container>
            <Grid item xs={6}>
              <LabeledStat className={styles.stat} label='HP' value={hp.curr}/>
            </Grid>
            <Grid item xs={6}>
              <ButtonSlider
                value={input}
                onChange={this.handleInputChange}
                onClick={this.changeHp}
              />
            </Grid>            
          </Grid>
          <CustomTitle className={styles.level}>
            Level: {level}
          </CustomTitle>
          <CustomList
            className={styles.list}
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
          <CustomList
            className={styles.list}
            data={SPELL_SLOTS}
            width={'100%'}
            height={288}
            itemSize={32}
            renderItem={(item) => {
              const spellLevelCurrentSlots = 
                  spells[item.toLowerCase().replace(' ', '')].curr;
              const label = item + ' - ' + spellLevelCurrentSlots;
            
              return (
                <SpellCaster
                  className={styles.label}
                  label={label}
                  onClick={this.castSpell}
                  contition={spellLevelCurrentSlots > 0}
                />
              );
            }}
          />
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
    marginTop: 15,
  },
  label: {
    display: 'block',
    textAlign: 'center',
    marginBottom: 6,
  },
  list: {
    marginBottom: 15,
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
