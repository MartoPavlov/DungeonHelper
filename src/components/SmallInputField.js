import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const SmallInputField = ({label, value, onChange}) => {
  return (
    <div>
        <span className={css(styles.label)}>{label}</span>
        <input
          className={css(styles.smallInput)}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength="3"
        />
    </div>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    paddingRight: 8,
    color: '#ec2127'
  },
  smallInput: {
    fontSize: 18,
    width: 40,
    ':focus': {
      outline: 'none',
    }
  },
});

export default SmallInputField;
