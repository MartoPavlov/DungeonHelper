import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import {css, StyleSheet} from 'aphrodite';

const CustomCheckbox = ({className, size, checked, onClick}) => {
  const animateCheck = {
    'from': {
      opacity: 0,
    },
    'to': {
      opacity: 1,
    }
  };
  const animateUncheck = {
    'from': {
      opacity: 1,
    },
    'to': {
      opacity: 0,
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      display: 'inline-block',
      border: '2px solid #000',
      borderRadius: size/5,
      width: size,
      height: size,
      fontSize: size,
      marginTop: size/2,
      ':hover': {
        backgroundColor: '#ddd',
      }
    },
    unchecked: {
      animationName: [animateUncheck],
      animationDuration: '500ms',
      animationIterationCount: 1,
      animationFillMode: 'forwards',
    },
    checked: {
      animationName: [animateCheck],
      animationDuration: '500ms',
      animationIterationCount: 1,
      animationFillMode: 'forwards',
    },
  });

  const checkedContainerStyles = checked ? styles.checked : styles.unchecked;

  return (
    <div className={css(className)}>
        <div
        className={css(styles.container)}
        onClick={onClick}
        >
        <div className={css(checkedContainerStyles)}>
          <CheckIcon color='error' fontSize="inherit"/>
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox;
