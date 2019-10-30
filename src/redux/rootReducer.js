import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'
import spellReducer from './spell/spellReducer';
import abilityReducer from './ability/abilityRecucer';
import inventoryReducer from './invenotry/inventoryReducer';
import userReducer from './user/userReducer';
import basicStatReducer from './basicStat/basicStatReducer';

const rootReducer = combineReducers({
  basics: basicStatReducer,
  stats: statReducer,
  spells: spellReducer,
  abilities: abilityReducer,
  inventory: inventoryReducer,
  user: userReducer,
});

export default rootReducer;
