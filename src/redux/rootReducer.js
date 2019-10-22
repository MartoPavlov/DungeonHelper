import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'

const rootReducer = combineReducers({
  stats: statReducer,
});

export default rootReducer;