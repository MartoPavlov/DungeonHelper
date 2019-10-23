import React from 'react';
import {css , StyleSheet} from 'aphrodite';
import Button from '@material-ui/core/Button';

const CustomButton = ({onClick, children, fontSize}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#ec2127',
      color: '#fff',
      fontSize: fontSize,
      height: fontSize * 2,
      width: '15%',
      margin: 10,
      padding: 0,
      textTransform: 'none',
    }
  });
  
  return (
    <Button
      className={css(styles.button)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
