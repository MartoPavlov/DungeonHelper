import {
  INCREMENT_SPELL_SLOT, DECREMENT_SPELL_SLOT, REGAIN_SPELL_SLOT,
  USE_SPELL_SLOT, RESET_SPELL_SLOTS, LOAD_SPELL_SLOTS
} from './spellActionTypes';

const initialState = {
  slot1: {curr: 0, max: 0},
  slot2: {curr: 0, max: 0},
  slot3: {curr: 0, max: 0},
  slot4: {curr: 0, max: 0},
  slot5: {curr: 0, max: 0},
  slot6: {curr: 0, max: 0},
  slot7: {curr: 0, max: 0},
  slot8: {curr: 0, max: 0},
  slot9: {curr: 0, max: 0},
};

const spellReducer = (state = initialState, action)  => {
  if (!action.slot) return state;
  const maxValue = state[action.slot].max;
  const currentValue = state[action.slot].curr;

  switch(action.type) {
    case INCREMENT_SPELL_SLOT: 
      return {
        ...state, [action.slot]: {curr: maxValue + 1, max: maxValue + 1},
      };
    case DECREMENT_SPELL_SLOT:
      return {
        ...state, [action.slot]: {curr: maxValue - 1, max: maxValue - 1},
      };
    case REGAIN_SPELL_SLOT:
      return {
        ...state, [action.slot]: {curr: maxValue, max: maxValue},
      };
    case USE_SPELL_SLOT:
      return {
        ...state, [action.slot]: {curr: currentValue, max: maxValue},
      };
    case RESET_SPELL_SLOTS:
      return initialState;
    case LOAD_SPELL_SLOTS:
      return {
        spells: action.spells
    };
    default: 
      return state;
  }
}

export default spellReducer;
