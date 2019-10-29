import React from 'react';
import {css , StyleSheet} from 'aphrodite';
import Button from '@material-ui/core/Button';

const CustomButton = ({onClick, children, fontSize = 18, width = '15%', className}) => {
  const styles = StyleSheet.create({
    container: {
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#ec2127',
      color: '#fff',
      fontSize: fontSize,
      height: fontSize * 2,
      width: width,
      margin: 10,
      padding: 0,
      textTransform: 'none',
    }
  });
  
  return (
    <div className={css(styles.container, className)}>
      <Button
        className={css(styles.button)}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
