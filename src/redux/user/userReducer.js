import {SET_USER} from './userActionTypes';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        user: action.user.uid,
      };
    default: 
      return state;
  }
}

export default userReducer;
