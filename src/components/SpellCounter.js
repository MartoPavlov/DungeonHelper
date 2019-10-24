import React from 'react';
import {incrementSpellSlot, decrementSpellSlot} from '../redux/index';
import LabelReduxCounter from './LabelReduxCounter';

const SpellCounter = ({label}) => {

  return (
    <LabelReduxCounter
      label={label}
      extractValue={extractValue}
      increment={incrementSpellSlot}
      decrement={decrementSpellSlot}
    />
  );
};

const extractValue = (state, dictionaryLabel) => {
  return state.spells[dictionaryLabel].max;
}

export default SpellCounter;
