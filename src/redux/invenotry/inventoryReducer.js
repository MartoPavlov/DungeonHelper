import {ADD_ITEM, USE_ITEM} from './inventoryActionTypes';

const initialState = {
  inventory: [],
};

const findItem = (state, name) => {
  const tempInventory = state.inventory;

  for (let i=0; i<tempInventory.length; i++) {
    if (tempInventory[i].name === name) return i;
  }
  return undefined; 
}

const addItem = (state, item) => {
  const tempInventory = state.inventory;
  const existingItemIndex = findItem(state, item.name);

  if (existingItemIndex) {
    tempInventory[existingItemIndex].count++;
  } else {
    tempInventory.push(item);
  }
}

const useItem = (state, name) => {
  const tempInventory = state.inventory;
  const existingItemIndex = findItem(state, name);

  if (existingItemIndex) {
   if (tempInventory[existingItemIndex].count === 1) {
    tempInventory = tempInventory.filter((item) => item.name !== name);
   } else {
     tempInventory[existingItemIndex].count--;
   }
  }
}

export default inventoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM:
      return {
        inventory: addItem(state, action.item)
      };
    case USE_ITEM:
      return {
        inventory: useItem(state, action.name)
      };
    default:
      return state;
  }
}
