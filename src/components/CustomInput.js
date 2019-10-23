import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const CustomInput = ({value, onChange}) => {
  return (
    <input
      className={css(styles.inputField)}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

const styles = StyleSheet.create({

  inputField: {
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#111',
    padding: 3,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    ':focus': {
      outline: 'none',
    }
  }
});

export default CustomInput;
