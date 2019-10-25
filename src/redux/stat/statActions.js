import { INCREMENT_STAT, DECREMENT_STAT } from './statActionTypes';

export const increment = (stat) => {
  return {
    type: INCREMENT_STAT,
    stat: stat,
  }
}

export const decrement = (stat) => {
  return {
    type: DECREMENT_STAT,
    stat: stat,
  }
}