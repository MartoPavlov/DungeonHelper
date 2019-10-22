import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'
import spellReducer from './spell/spellReducer';

const rootReducer = combineReducers({
  stats: statReducer,
  spells: spellReducer,
});

export default rootReducer;