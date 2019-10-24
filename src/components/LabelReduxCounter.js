import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import ReduxCounter from './ReduxCounter';

const StatCounter = ({label, extractValue, increment, decrement,
  min = 0, max = 999}) => {
  const dictionaryLabel = label.toLowerCase().replace(/(.+) /, '$1');

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.labelContainer)}>
        <span className="label">{label}</span>
      </div>
      <ReduxCounter
        className={css(styles.counterContainer)}
        extractValue={extractValue}
        increment={increment}
        decrement={decrement}
        min={min}
        max={max}
        dictionaryLabel={dictionaryLabel}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    marginTop: 4,
  },
  labelContainer: {
    display: 'inline-block',
    width: '45%',
    textAlign: 'right',
    margin: 0,
  },
});

export default StatCounter;
