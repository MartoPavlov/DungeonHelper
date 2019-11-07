import {SET_USER} from './userActionTypes';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      const user = action.user;
      return user ? {user: user.uid} : {user: null};
    default: 
      return state;
  }
}

export default userReducer;
