import React from 'react';
import {increment, decrement} from '../redux/index';
import LabelCounter from './LabelCounter';

const StatCounter = ({label}) => {

  return (
    <LabelCounter
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
