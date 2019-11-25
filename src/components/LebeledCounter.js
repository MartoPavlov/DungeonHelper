import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import CounterValue from './CounterValue';
import Counter from './Counter';
import PropTypes from 'prop-types';

const LebeledCounter = ({className, label, value, increment, decrement, min,
    max}) => {
  return (
    <div className={css(styles.labeledCounter, className)}>
      <CustomTitle>{label}</CustomTitle>
      <CounterValue count={value} />
      <Counter
        value={value}
        increment={increment}
        decrement={decrement}
        min={min}
        max={max}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  labeledCounter: {
    marginTop: 5,
    marginBottom: 5,
  }
});

LebeledCounter.propTypes = {
  className: PropTypes.object,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default LebeledCounter;
