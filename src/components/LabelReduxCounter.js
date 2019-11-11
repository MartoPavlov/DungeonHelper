import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import ReduxCounter from './ReduxCounter';
import CustomTitle from './CustomTitle';
import PropTypes from 'prop-types';

/**
 * Component that renders a counter with a label. The counter uses the 
 * redux store direcly.
 * @param {Object} props
 */
const LabeledReduxCounter = ({className, label, extractValue, increment, decrement,
  min = 0, max = 999}) => {
  const dictionaryLabel = label.toLowerCase().replace(/(.+) /, '$1');

  return (
    <div className={css(styles.container, className)}>
      <div className={css(styles.labelContainer)}>
        <CustomTitle>{label}</CustomTitle>
      </div>
      <ReduxCounter
        className={styles.counterContainer}
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

LabeledReduxCounter.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  extractValue: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default LabeledReduxCounter;
