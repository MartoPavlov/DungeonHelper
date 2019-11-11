import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withSnackbar} from 'notistack';
import CustomButton from '../components/CustomButton';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import CustomCheckbox from '../components/CustomCheckbox';
import Text from '../components/Text';
import {StyleSheet} from 'aphrodite';
import Image from '../components/Image';
import dandd from '../assets/dandd.png';
import Firebase from '../firebase/Firebase';

/**
 * The Registration page of the applications
 */
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confPassword: '',
      agreed: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfPasswordInput = this.handleConfPasswordInput.bind(this);
    this.handleAgreementCheckboxClick = 
      this.handleAgreementCheckboxClick.bind(this);
    this.handleOnRegisterClick = this.handleOnRegisterClick.bind(this);
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

  handleConfPasswordInput(text) {
    this.setState({
      confPassword: text,
    });
  }

  handleAgreementCheckboxClick() {
    this.setState({
      agreed: !this.state.agreed,
    })
  }

  fireAnError(error) {
    this.props.enqueueSnackbar(error, {variant: 'error'});
  }

  handleOnRegisterClick() {
    const {email, password, confPassword, agreed} = this.state;

    if (!email || !password || password !== confPassword || !agreed) {
      if (!email) {
        this.fireAnError('The email field is empty');
      }
      if (!agreed) {
        this.fireAnError('You haven\'t agreed with the terms');
      }
      if (!password) {
        this.fireAnError('The password field is empty');
      }
      if (password !== confPassword) {
        this.fireAnError('The Password and Confirm Password fields must be the same');
      }
      this.setState({
        password: '',
        confPassword: '',
      });
      return;
    }

    this.createUserInDatabase();
  }

  createUserInDatabase() {
    const {email, password} = this.state;

    Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.setState({
        email: '',
        password: '',
        confPassword: '',
        agreed: false,
      }, () => {
        this.navigateToLogin();
      });
    }).catch((error) => {
      this.setState({
        password: '',
        confPassword: '',
      }, () => this.fireAnError(error.message))
    });
  }

  navigateToLogin() {
    this.props.history.push('/');
  }

  render() {
    const {email, password, confPassword, agreed} = this.state;

    return (
      <form>
        <Image className={styles.image} src={dandd} />
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
          <Grid item xs={5}>
            <CustomTitle className={styles.label}>
              Confirm Password
            </CustomTitle>
          </Grid>
          <Grid item xs={7}>
            <CustomInput
              value={confPassword}
              onChange={this.handleConfPasswordInput}
              password={true}
            />
          </Grid>
          <Grid item xs={5}>
            <CustomCheckbox
              className={styles.checkbox}
              size={20}
              checked={agreed}
              onClick={this.handleAgreementCheckboxClick}
            />
          </Grid>
          <Grid item xs={7}>
            <Text className={styles.text}>I agree with the terms</Text>
          </Grid>
        </Grid>
        <CustomButton
          className={styles.button}
          onClick={this.handleOnRegisterClick}
        >
          Register
        </CustomButton>
      </form>
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
    width: 400,
  },
  text: {
    marginTop: 10,
    textAlign: 'start',
  },
  checkbox: {
    textAlign: 'end',
  },
  button: {
    marginTop: 20,
  },
  error: {
   marginTop: 20,
   fontStyle: 'italic', 
  }
});

export default withSnackbar(Register);
