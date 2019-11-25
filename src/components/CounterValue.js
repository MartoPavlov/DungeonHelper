import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component suited for representation of Counter's value
 * @param {Object} props
 * @see Counter
 */
const CounterValue = ({className, count}) => {
  return (
    <span className={css(styles.counter, className)}>{count}</span>
  );
};

const styles = StyleSheet.create({
  counter: {
    display: 'inline-block',
    width: 25,
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },
});

CounterValue.propTypes = {
  className: PropTypes.object,
  count: PropTypes.number.isRequired,
};

export default CounterValue;
