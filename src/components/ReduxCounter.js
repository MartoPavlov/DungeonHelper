import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import Counter from './Counter';

const ReduxCounter = ({extractValue, increment, decrement,
    min, max, dictionaryLabel}) => {
  const value = useSelector((state) => extractValue(state, dictionaryLabel));
  const dispatch = useDispatch();

  return (
    <div className={css(styles.container)}>
      <span className={css(styles.counter)}>{value}</span>
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

export default ReduxCounter;
