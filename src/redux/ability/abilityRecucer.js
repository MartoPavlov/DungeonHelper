import {ABILITY_ADD, ABILITY_EDIT, ABILITY_USE} from './abilityActionTypes';

const initialState = {
  abilities: [],
}

const abilityExists = (state, name) => {
  const tempAbilities = state.abilities;
  
  for (let i=0; i<tempAbilities.length; i++) {
    if (tempAbilities[i].name === name) {
      return true;
    }
  }
  return false;
}

const addAbility = (state, action) => {
  const tempAbilities = state.abilities;

  if (!abilityExists(state, action.name)) {
    tempAbilities.push(action.ability);
  }
  return tempAbilities;
}

const editAbility = (state, action) => {
  const {originalName, ability} = action;
  const tempAbilities = state.abilities;

  for (let i=0; i<tempAbilities.length; i++) {
    if (tempAbilities[i].name === originalName) {
      tempAbilities[i] = ability;
      break;
    }
  }
  return tempAbilities;
}

const useeAbility = (state, name) => {
  const tempAbilities = state.abilities;
  
  for (let i=0; i<tempAbilities.length; i++) {
    if (tempAbilities[i].name === name && tempAbilities[i].uses > 0) {
      tempAbilities[i].uses--;
      break;
    }
  }
  return tempAbilities;
}

const abilityReducer = (state = initialState, action) => {
  switch(action.type) {
    case ABILITY_ADD:
      return {
        abilities: addAbility(state, action),
      };
    case ABILITY_EDIT:
      return {
        abilities: editAbility(state, action),
      };
    case ABILITY_USE:
      return {
        abilities: useeAbility(state, action.name),
      };
    default:
      return state;
  }
}

export default abilityReducer;
