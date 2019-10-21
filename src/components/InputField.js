import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const InputField = ({label, value, onChange}) => {
  return (
    <div>
      <span className="label">{label}</span>
      <input
        className={css(styles.inputField)}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
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
    ':focus': {
      outline: 'none',
    }
  }
});

export default InputField;
