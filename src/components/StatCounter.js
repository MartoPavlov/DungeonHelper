import React from 'react';
import {increment, decrement} from '../redux/index';
import LabelReduxCounter from './LabelReduxCounter';

const StatCounter = ({label}) => {

  return (
    <LabelReduxCounter
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

export default StatCounter;
