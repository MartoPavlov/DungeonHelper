import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import CustomSmallInput from './CustomSmallInput';
import CustomTitle from './CustomTitle';

const SmallInputField = ({label, value, onChange, className}) => {
  return (
    <div className={css(styles.container, className)}>
        <CustomTitle>{label}</CustomTitle>
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
    textAlign: 'center',
  },
});

export default SmallInputField;
