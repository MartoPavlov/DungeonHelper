import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {css, StyleSheet} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import { withSnackbar } from 'notistack';
import If from './If';
import CustomTitle from './CustomTitle';
import CustomButton from './CustomButton';
import {setUser} from '../redux/index';
import Firebase from '../firebase/Firebase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';

/**
 * The navigation bar on the top of the page.
 * @param {Object} props
 */
const NavigationBar = ({className, history, enqueueSnackbar}) => {
  const user  = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const [bounds, setBounds] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const resize = (event) => {
    setBounds({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  const styles = StyleSheet.create({
    navbar: {
      backgroundColor: '#ec2127',
      color: '#fff',
    },
    user: {
      height: '100%',
      textAlign: 'right',
      position: 'relative',
    },
    label: {
      fontSize: Math.min(20, bounds.width / 33),
      color: '#fff',
      display: 'inline-block',
      height: 35,
    },
    button: {
      position: 'inherit',
      display: 'inline-block',
      marginLeft: 7,
    },
    arrowBackIcon: {
      marginRight: 15,
      cursor: 'pointer',
    }
  });

  const logout = () => {
    Firebase.auth().signOut().then(() => {
      dispatch(setUser({}));
      history.push('/');
      enqueueSnackbar('Logged out succesfuly', {variant: 'success'})
    });
  }

  const email = user ? user.email : '';

  return (
    <div className={css(styles.navbar, className)}>
      <AppBar className={css(styles.navbar)} position='static'>
        <Toolbar>
          <Grid container justify='space-between' alignItems='center'>
            <Grid>
              <Typography variant='h4'>
                <ArrowBackIcon
                  className={css(styles.arrowBackIcon)}
                  onClick={() => history.goBack()}
                />
                Dungeon Helper
              </Typography>
            </Grid>
            <Grid>
              <If condition={!!user}>
                <div className={css(styles.user)}>
                  <CustomTitle className={styles.label}>{email}</CustomTitle>
                  <CustomButton
                    fontSize={Math.min(20, bounds.width / 33)}
                    className={styles.button}
                    onClick={logout}
                  >
                    Logout
                  </CustomButton>
                </div>
              </If>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavigationBar.propTypes = {
  className: PropTypes.object,
};

export default withSnackbar(NavigationBar);
