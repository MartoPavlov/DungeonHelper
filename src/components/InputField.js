import React from 'react';
import CustomInput from './CustomInput';
import CustomTitle from './CustomTitle';
import { css, StyleSheet } from 'aphrodite';

const InputField = ({label, value, onChange, className, password}) => {
  return (
    <div className={css(styles.container, className)}>
      <CustomTitle>{label}</CustomTitle>
      <CustomInput
        value={value}
        onChange={onChange}
        password={password}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

export default InputField;
