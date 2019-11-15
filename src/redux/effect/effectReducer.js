import {
  ADD_EFFECT, UPDATE_DURATIONS, LOAD_EFFECTS, RESET_EFFECTS
} from './effectActionTypes';

const initialState = {
  effects: [],
};

const addEffect = (state, effect) => {
  const effects = state.effects;

  effects.push(effect);
  return effects;
}

const isPartOfTheArray = (name, array) => {
  for (let i=0; i<array.length; i++) {
    if (name === array[i]) return true;
  }
  return false;
} 

const updateDurations = (state) => {
  const effects = state,effects;
  const toRemove = [];

  for (let i=0; i<effects.length; i++) {
    effects[i].basics.duration--;
    if (effects[i].basics.duration == 0) {
      toRemove.push(effects[i].basics.name);
    }
  }

  effects.filter((effect) => isPartOfTheArray(effect.basics.name, toRemove));

  return effects;
}

const effectReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_EFFECT:
      return {
        effects: addEffect(state, action.effect),
      };
    case UPDATE_DURATIONS:
      return {
        effects: updateDurations(state),
      };
    case LOAD_EFFECTS: 
      return {
        effects: action.effects,
      };
    case RESET_EFFECTS:
      return initialState;
    default:
      return state;
  }
}

export default effectReducer;
