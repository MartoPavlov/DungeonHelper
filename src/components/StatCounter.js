import React from 'react';
import {increment, decrement} from '../redux/index';
import LabelReduxCounter from './LabelReduxCounter';
import PropTypes from 'prop-types';

/**
 * A Stat adaptation of the LabelReduxCounter. Low reuseability.
 * @param {Object} props
 * @see LabelReduxCounter
 */
const StatCounter = ({className, label}) => {

  return (
    <LabelReduxCounter
      className={className}
      label={label}
      extractValue={extractValue}
      increment={increment}
      decrement={decrement}
    />
  );
};

const extractValue = (state, dictionaryLabel) => {
  return state.stats[dictionaryLabel];
}

StatCounter.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default StatCounter;
