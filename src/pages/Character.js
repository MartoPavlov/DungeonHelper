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

class Character extends Component {
  constructor() {
    super();
    this.state = {
      character: {
        level: 0,
        hp: {curr: 0, max: 0}
      },
      input: '',
      loaded: false,
    };

    this.changeHp = this.changeHp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {

    const user = this.props.user;
    const charName = this.props.location.state.name;

    Firebase.database().ref('characterInfo/'+user+'/'+charName).on('value', (data) => {
      const val = data.val();
  
      if (!val) return;
      const snap = Object.values(val)[0];
      const {name, hp, level, stats, spells, abilities, inventory} = snap;
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
  }

  changeHp(value) {
    const character = this.state.character;
    let hp = Number(character.hp.curr);

    if (isNaN(hp)) hp = 0;
    value = Number(value);
    if (isNaN(value)) return;
    hp += value;
    if (hp < 0) hp = 0;
    character.hp.curr = hp;
    this.setState({
      character: character,
      input: '',
    });
  }

  handleInputChange(text) {
    this.setState({
      input: text,
    });
  }

  renderLoadingScreen() {
    return <LoadingScreen height={window.innerHeight*8/9}/>;
  }

  render() {
    const {name, hp, level} = this.state.character;
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
        </If>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 50,
  },
  stat: {
    textAlign: 'right',
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
