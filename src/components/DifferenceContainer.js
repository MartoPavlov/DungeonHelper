import React, {useState} from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import ButtonSlider from './ButtonSlider';

const DifferenceContainer = ({className, label, value, onClick}) => {
  const [plusMinusValue, setValue] = useState(undefined);
  
  return (
    <div className={css(styles.container, className)}>
      <CustomTitle>{label}</CustomTitle>
      <span className={css(styles.counter)}>{value}</span>
      <ButtonSlider
        value={plusMinusValue}
        onChange={(value) => setValue(value)}
        onClick={() => onClick(plusMinusValue)}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    maxHeight: 28,
    minHeight: 28,
  },
  counter: {
    border: '1px solid #000',
    fontSize: 18,
    padding: 5,

  }
});

export default DifferenceContainer;
