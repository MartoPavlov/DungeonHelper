import React from 'react';
import {css , StyleSheet} from 'aphrodite';
import Button from '@material-ui/core/Button';

const CustomButton = ({onClick, children}) => {
  return (
    <Button
      className={css(styles.button)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ec2127',
    color: '#fff',
    fontSize: 18,
    width: '15%',
  }
});

export default CustomButton;
