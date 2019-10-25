import {ADD_ITEM, USE_ITEM, GAIN_BRONZE, LOSE_BRONZE} 
  from './inventoryActionTypes';

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item: item
  };
}

export const useItem = (name) => {
  return {
    type: USE_ITEM,
    name: name,
  }
}

export const gainBronze = (value) => {
  return {
    type: GAIN_BRONZE,
    value: value,
  }
}

export const loseBronze = (value) => {
  return {
    type: LOSE_BRONZE,
    value: value,
  }
}
