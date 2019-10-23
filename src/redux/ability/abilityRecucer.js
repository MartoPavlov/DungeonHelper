import {ABILITY_ADD, ABILITY_EDIT, ABILITY_USE} from './abilityActionTypes';

const initialState = {
  abilities: [],
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

const useAbility = (state, name) => {
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
  const tempAbilities = state.abilities;

  switch(action.type) {
    case ABILITY_ADD:
      tempAbilities.push(action.ability)
      return {
        abilities: tempAbilities,
      };
    case ABILITY_EDIT:
      return {
        abilities: editAbility(state, action),
      };
    case ABILITY_USE:
      return {
        abilities: useAbility(state, action.name),
      };
    default:
      return state;
  }
}

export default abilityReducer;
