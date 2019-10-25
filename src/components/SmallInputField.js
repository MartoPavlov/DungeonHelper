import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import CustomSmallInput from './CustomSmallInput';

const SmallInputField = ({label, value, onChange}) => {
  return (
    <div className={css(styles.container)}>
        <span className={css(styles.label)}>{label}</span>
        <CustomSmallInput
          value={value}
          onChange={onChange}
          width={40}
        />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginTop: 5,
  },
  label: {
    fontSize: 20,
    paddingRight: 8,
    color: '#ec2127'
  },
});

export default SmallInputField;
