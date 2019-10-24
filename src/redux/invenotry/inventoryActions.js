import {ADD_ITEM, USE_ITEM} from './inventoryActionTypes';

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
