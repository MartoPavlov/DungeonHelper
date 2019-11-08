import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite';
import {connect} from 'react-redux';
import Firebase from '../firebase/Firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '../components/IconButton';
import CustomList from '../components/CustomList';
import CustomButton from '../components/CustomButton';
import If from '../components/If';
import LoadingScreen from '../LoadingScreen';

/**
 * Page that handles character selection
 */
class SelectCharacter extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      loaded: false,
      characters: [],
    };

    this.handleAddCharacterClick = this.handleAddCharacterClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
    this.collectCharactersFromDatabase = 
      this.collectCharactersFromDatabase.bind(this);
  }

  componentDidMount() {
    if (this.userNotAuthenticated()) {
      this.forceAuthentication();
    } else {
      window.addEventListener('resize', this.handleResize);
      
      this.collectCharactersFromDatabase();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(event) {
    this.setState({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  }

  handleAddCharacterClick() {
    this.props.history.push('/create');
  }

  handleSelectCharacter(event) {
    this.props.history.push('/character', {name: event.target.innerHTML});
  }

  renderLoadingScreen() {
    const {height} = this.state;
    
   /**
    * Note that the loading screen height must be the same as the 
    * character list's
    */
    return <LoadingScreen className={styles.loading} height={height*2/3} />
  }

  userNotAuthenticated() {
    return !this.props.user;
  }

  forceAuthentication() {
    this.props.history.push('/');
  }

  collectCharactersFromDatabase() {
    Firebase.database().ref('/characterInfo/' + this.props.user.uid).on('value', (data) => {
      const tempCharacters = this.state.characters;
      data.forEach((character) => {
        const val = character.val();
        tempCharacters.push(val.name);
      });
      this.setState({
        characters: tempCharacters,
        loaded: true,
      });
    });
  }

  render() {
    const {characters, width, height, loaded} = this.state;

    return (
      <div>
        <h1 className={css(styles.heading)}>Select Character: </h1>
        <If condition={loaded} els={this.renderLoadingScreen()}>
          <CustomList
            className={styles.list}
            data={characters}
            width={width/2}
            height={height*2/3}
            renderItem={(item) => {
              return (
                <CustomButton
                  className={styles.button}
                  fontSize={20}
                  width={'60%'}
                  onClick={this.handleSelectCharacter}
                >
                  {item}
                </CustomButton>
              );
            }}
          />
        </If>
        <IconButton
          className={styles.addButton}
          onClick={this.handleAddCharacterClick}
          >
            <AddCircleIcon color="error" fontSize="inherit" />
        </IconButton>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginBottom: 50,
    color: '#ec2127'
  },
  list: {
    textAlign: 'center',
    padding: 15,
  },
  addButton: {
    display: 'block',
    textAlign: 'center',
    fontSize: 60,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  loading: {
    marginBottom: 34,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps)(SelectCharacter);
