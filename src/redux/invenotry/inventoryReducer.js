import {ADD_ITEM, USE_ITEM, GAIN_BRONZE, LOSE_BRONZE} 
  from './inventoryActionTypes';

const initialState = {
  inventory: [],
  bronze: 0,
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

  if (existingItemIndex !== undefined) {
    tempInventory[existingItemIndex].count+=item.count;
  } else {
    tempInventory.push(item);
  }
  return tempInventory;
}

const useeItem = (state, name) => {
  let tempInventory = state.inventory;
  const existingItemIndex = findItem(state, name);

  if (existingItemIndex !== undefined) {
    if (tempInventory[existingItemIndex].count === 1) {
      tempInventory = tempInventory.filter((item) => item.name !== name);
    } else {
      tempInventory[existingItemIndex].count--;
    }
  }
  return tempInventory;
}

const inventoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM:
      return {
        ...state,
        inventory: addItem(state, action.item)
      };
    case USE_ITEM:
      return {
        ...state,
        inventory: useeItem(state, action.name)
      };
    case GAIN_BRONZE:
      return {
        ...state,
        bronze: state.bronze + action.value,
      }
    case LOSE_BRONZE:
      return {
        ...state,
        bronze: state.bronze - action.value,
      }
    default:
      return state;
  }
}

export default inventoryReducer;
