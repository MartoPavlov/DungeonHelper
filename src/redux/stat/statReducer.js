import {INCREMENT_STAT, DECREMENT_STAT} from './statActionTypes';

const initialState = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intellect: 8,
  wisdom: 8,
  charisma: 8,
};

const stateReducer = (state = initialState, action) => {
  const currentValue = state[action.stat];

  switch(action.type) {
    case INCREMENT_STAT:
      return {
        ...state, [action.stat]: currentValue + 1,
      };
    case DECREMENT_STAT:
      return {
        ...state, [action.stat]: currentValue - 1,
      }
    default: return state;
  }
}

export default stateReducer;

