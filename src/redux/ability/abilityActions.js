import {
  ABILITY_ADD, ABILITY_EDIT, ABILITY_USE, DELETE_ABILITIES,
  LOAD_ABILITIES
} from './abilityActionTypes';

export const addAbility = (ability) => {
  return {
    type: ABILITY_ADD,
    ability: ability,
  };
}

export const editAbility = (originalName, name, maxUses, cooldown) => {
  return {
    type: ABILITY_EDIT,
    name: originalName,
    ability: {
      name: name,
      uses: maxUses,
      maxUses: maxUses,
      cooldown: cooldown,
    }
  };
}

export const useAbility = (name) => {
  return {
    type: ABILITY_USE,
    name: name,
  };
}

export const deleteAllAbilities = () => {
  return {
    type: DELETE_ABILITIES,
  };
}

export const loadAbilities = (abilities) => {
  return {
    type: LOAD_ABILITIES,
    abilities: abilities,
  };
}
