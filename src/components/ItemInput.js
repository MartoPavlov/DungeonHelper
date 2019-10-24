import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomInput from './CustomInput';
import Counter from './Counter';
import CustomButton from './CustomButton';

const ItemInput = ({label, name, count, onChange, increment, decrement}) => {

  return (
    <div className={css(styles.container)}>
      <span className="label">{label}</span>
      <CustomInput value={name} onChange={onChange} />
      <span className={css(styles.counter)}>{count}</span>
      <Counter value={count} increment={increment} decrement={decrement} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    marginTop: 4,
    display: 'inline-block',
    width: '45%',
    textAlign: 'left',
  },
  counter: {
    display: 'inline-block',
    width: '4%',
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },
});

export default ItemInput;
