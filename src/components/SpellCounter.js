import React from 'react';
import {incrementSpellSlot, decrementSpellSlot} from '../redux/index';
import LabelReduxCounter from './LabelReduxCounter';
import PropTypes from 'prop-types';

/**
 * A Spell adaptation of the LabelReduxCounter. Low reuseability.
 * @param {Object} props
 * @see LabelReduxCounter
 */
const SpellCounter = ({className, label}) => {

  return (
    <LabelReduxCounter
      className={className}
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

SpellCounter.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SpellCounter;
