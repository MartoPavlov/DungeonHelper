import {
  ADD_EFFECT, UPDATE_DURATIONS, LOAD_EFFECTS, RESET_EFFECTS
} from './effectActionTypes';

export const addEffect = (effect) => {
  return {
    type: ADD_EFFECT,
    effect: effect,
  };
}

export const updateDurations = () => {
  return {
    type: UPDATE_DURATIONS,
  };
}

export const loadEffects = (effects) => {
  return {
    type: LOAD_EFFECTS,
    effects: effects,
  };
}

export const resetEffects = () => {
  return {
    type: RESET_EFFECTS,
  }
}
