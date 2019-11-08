import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import {css, StyleSheet} from 'aphrodite';
import Text from './Text';

const SnackbarMessage = ({className, type, message, onClose}) => {
  
  const styles= StyleSheet.create({
    message: {
      padding: 10,
      borderRadius: 5,
    },
    error: {
      backgroundColor: '#ec0000',
    },
    success: {
      backgroundColor: '#32a852',
    },
    icon: {
      position: 'inherit',
      paddingTop: 5,
      paddingRight: 5,
      fontSize: 20,
      color: '#fff',
      cursor: 'pointer'
    },
    text: {
      color: '#fff',
      fontSize: 16,
    }
  });
  
  return (
    <SnackbarContent
      className={css(styles[type], styles.message, className)}
      message={
        <Text className={styles.text}>{message}</Text>
      }
      action={[
        <div key='close' className={css(styles.icon)}>
          <CloseIcon
            color='inherit'
            fontSize='inherit'
            onClick={onClose}
          />
        </div>
      ]}
    />
  );
};

export default SnackbarMessage;
