import React, {Component} from 'react';
import {StyleSheet} from 'aphrodite';
import Grid from '@material-ui/core/Grid'
import CustomButton from '../components/CustomButton';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import dandd from '../assets/dandd.png'
import Image from '../components/Image';
import {Link} from 'react-router-dom';
import Firebase from '../firebase/Firebase';
import Text from '../components/Text';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleLogin() {
    const {email, password} = this.state;
    Firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.setState({
        email: '',
        password: '',
      }, () => {
        this.props.history.push('/create');
      });
    }).catch((mess) => {
      this.setState({
        error: mess.message,
        password: '',
      });
    })
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

  render() {
    const {email, password, error} = this.state;

    return (
      <div>
        <Image className={styles.image} src={dandd}/>
        <Grid container spacing={2}>
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
        <CustomButton onClick={this.handleLogin}>
          Login
        </CustomButton>
        <Text className={styles.error}>
          {error}
        </Text>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 13,
    display: 'block',
    textAlign: 'end',
  },
  image: {
    width: '30%',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
   marginTop: 20,
   fontStyle: 'italic', 
  }
});
