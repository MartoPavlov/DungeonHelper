import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite';
import Firebase from '../firebase/Firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '../components/IconButton';
import CustomList from '../components/CustomList';
import CustomButton from '../components/CustomButton';

export default class SelectCharacter extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      characters: [],
    };

    this.handleAddCharacterClick = this.handleAddCharacterClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
  }

  componentDidMount() {
    if (!Firebase.auth().currentUser) {
      this.props.history.push('/');
    }
    window.addEventListener('resize', this.handleResize);

    const currentUser = Firebase.auth().currentUser
      ? Firebase.auth().currentUser.uid
      : '';
    
    Firebase.database().ref('/characterInfo/'+currentUser).on('value', (data) => {
      const tempCharacters = this.state.characters;

      data.forEach((character) => {
        const val = character.val();
        const snap = Object.values(val);

        tempCharacters.push(snap[0].name);
      });

      this.setState({
        characters: tempCharacters,
      });
    })
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

  render() {
    const {characters, width, height} = this.state;

    return (
      <div>
        <h1 className={css(styles.heading)}>Select Character: </h1>
        <CustomList
          className={styles.list}
          data={characters}
          width={width/2}
          height={height*3/4}
          renderItem={(item) => {
            return (
              <CustomButton
                fontSize={20}
                width={'60%'}
                onClick={this.handleSelectCharacter}
              >
                {item}
              </CustomButton>
            );
          }}
        />
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
    textAlign: 'center',
    fontSize: 60,
  },
});
