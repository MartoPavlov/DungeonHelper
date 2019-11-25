import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomInput from './CustomInput';
import Counter from './Counter';
import CustomTitle from './CustomTitle';
import CounterValue from './CounterValue';
import PropTypes from 'prop-types';

/**
 * Component that is used for iinputing the information about the items in the
 * InventoryCreator
 * @param {Object} props
 * @see InventoryCreator
 */
const ItemInput = ({className, label, name, count, onChange, increment, decrement}) => {

  return (
    <div className={css(styles.container, className)}>
      <CustomTitle>{label}</CustomTitle>
      <CustomInput value={name} onChange={onChange} />
      <CounterValue count={count} />
      <Counter value={count} increment={increment} decrement={decrement} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
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

ItemInput.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default ItemInput;
