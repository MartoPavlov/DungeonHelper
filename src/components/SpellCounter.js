import React from 'react';
import {incrementSpellSlot, decrementSpellSlot} from '../redux/index';
import LabelCounter from '../components/LabelCounter';

const SpellCounter = ({label}) => {

  return (
    <LabelCounter
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
