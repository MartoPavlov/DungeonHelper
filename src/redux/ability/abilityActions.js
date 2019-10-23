import {ABILITY_ADD, ABILITY_EDIT, ABILITY_USE} from './abilityActionTypes';

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
