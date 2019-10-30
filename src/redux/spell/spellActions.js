import {
  INCREMENT_SPELL_SLOT, DECREMENT_SPELL_SLOT, REGAIN_SPELL_SLOT,
  USE_SPELL_SLOT, RESET_SPELL_SLOTS, LOAD_SPELL_SLOTS
} from './spellActionTypes';

export const incrementSpellSlot = (label) => {
  return {
    type: INCREMENT_SPELL_SLOT,
    slot: label,
  };
}

export const decrementSpellSlot = (label) => {
  return {
    type: DECREMENT_SPELL_SLOT,
    slot: label,
  };
}

export const regainSpellSlot = (label) => {
  return {
    type: REGAIN_SPELL_SLOT,
    slot: label,
  };
}

export const useSpellSlot = (label) => {
  return {
    type: USE_SPELL_SLOT,
    slot: label,
  };
}

export const resetSpellSlots = () => {
  return {
    type: RESET_SPELL_SLOTS,
  };
}

export const loadSpellSlots = (spells) => {
  return {
    type: LOAD_SPELL_SLOTS,
    spells: spells,
  };
}