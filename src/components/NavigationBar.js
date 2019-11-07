import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {css, StyleSheet} from 'aphrodite';

const NavigationBar = ({className}) => {
  const styles = StyleSheet.create({
    navbar: {
      backgroundColor: '#ec2127',
      color: '#fff',
    }
  });

  return (
    <div className={css(styles.navbar, className)}>
      <AppBar className={css(styles.navbar)} position='static'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Dungeon Helper
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
