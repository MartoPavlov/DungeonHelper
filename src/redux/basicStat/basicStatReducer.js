import {SET_BASIC_STATS} from './basicStatActionTypes';

const initialState = {
  name: '',
  hp: 0,
  level: 0,
};

const basicStatReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BASIC_STATS: 
      return action.stats;
    default:
      return state;
  }
}

export default basicStatReducer;
