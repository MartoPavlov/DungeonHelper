import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import Counter from './Counter';
import CounterValue from './CounterValue';
import PropTypes from 'prop-types';

/**
 * Component that renders a counter that increment or decrement a value in the
 * redux store. Used in LabeledReduxCounter
 * @param {Object} props
 * @see LabeledReduxCounter
 */
const ReduxCounter = ({extractValue, increment, decrement,
    min, max, dictionaryLabel, className}) => {
  const value = useSelector((state) => extractValue(state, dictionaryLabel));
  const dispatch = useDispatch();

  return (
    <div className={css(styles.container, className)}>
      <CounterValue count={value} />
      <Counter
        value={value}
        min={min}
        max={max}
        increment={() => dispatch(increment(dictionaryLabel))}
        decrement={() => dispatch(decrement(dictionaryLabel))}
      />
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
    width: 25,
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },
});

ReduxCounter.propTypes = {
  className: PropTypes.object,
  extractValue: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  dictionaryLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default ReduxCounter;
