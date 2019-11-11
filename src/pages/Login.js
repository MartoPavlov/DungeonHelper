import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack';
import CustomButton from '../components/CustomButton';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import dandd from '../assets/dandd.png'
import Image from '../components/Image';
import {Link} from 'react-router-dom';
import Firebase from '../firebase/Firebase';
import Text from '../components/Text';
import {setUser} from '../redux/index';

/**
 * The login page of the application
 */
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEnterKeyboardButton = this.handleEnterKeyboardButton.bind(this);
    this.fireAnError = this.fireAnError.bind(this);
  }

  componentDidMount() {
    const user = Firebase.auth().currentUser;
    
    if (user) {
      this.props.setUser(user);
      this.props.history.push('/select');
    }
    window.addEventListener('keydown', this.handleEnterKeyboardButton);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEnterKeyboardButton);
  }

  handleEnterKeyboardButton(event) {
    if (event.code === 'Enter') {
      this.handleLogin();
    }
  }

  /**
   * Executed when you click the 'Login' button
   * Fires snackbar errors on invalid credentials
   */
  handleLogin() {
    const {email, password} = this.state;

    if (!email || !password) {
      if (!email) {
        this.fireAnError('The email field is empty');
      }
      if (!password) {
        this.fireAnError('The password field is empty');
      }
      return;
    }

    Firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.setState({
        email: '',
        password: '',
      }, () => {
        this.setUserInRedux(Firebase.auth().currentUser)
        this.navigateToSelectPage();
      });
    }).catch((mess) => {
      this.fireAnError(mess.message);
    });
  }

  handleEmailInput(text) {
    this.setState({
      email: text,
    });
  }

  handlePasswordInput(text) {
    this.setState({
      password: text,
    });
  }

  navigateToSelectPage() {
    this.props.history.push('/select');
  }

  setUserInRedux(user) {
    this.props.setUser(user);
  }

  /**
   * Creates a snackbar with a message the given parameter
   * @param {String} error 
   */
  fireAnError(error) {
    this.setState({
      password: '',
    }, () => this.props.enqueueSnackbar(error, {variant: 'error'}));
  }

  render() {
    const {email, password} = this.state;

    return (
      <form>
        <Image className={styles.image} src={dandd}/>
        <Grid container justify='flex-end'>
          <Grid item xs={5}>
            <CustomTitle className={styles.label}>E-mail</CustomTitle>
          </Grid>
          <Grid item xs={7}>
            <CustomInput
              value={email}
              onChange={this.handleEmailInput}
            />
          </Grid>
          <Grid item xs={5}>
            <CustomTitle className={styles.label}>Password</CustomTitle>
          </Grid>
          <Grid item xs={7}>
            <CustomInput
              value={password}
              onChange={this.handlePasswordInput}
              password={true}
            />
          </Grid>
        </Grid>
        <Text className={styles.text}>
            Not registered yet?&nbsp;
            <Link to="/register">Register</Link>
          </Text>
          <CustomButton
            className={styles.button}
            onClick={this.handleLogin}
            width={200}
          > 
            Login
          </CustomButton>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    display: 'block',
    textAlign: 'end',
    padding: 20.
  },
  image: {
    width: 400,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapPropsToDispatch = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

export default withSnackbar(connect(null, mapPropsToDispatch)(Login));
