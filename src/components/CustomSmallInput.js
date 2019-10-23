import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const CustomSmallInput = ({value, onChange, width}) => {
  const styles = StyleSheet.create({
    smallInput: {
      fontSize: 18,
      width: width,
      ':focus': {
        outline: 'none',
      }
    },
  });

  return (
    <input
      className={css(styles.smallInput)}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      maxLength="3"
    /> 
  );
};

export default CustomSmallInput;
