import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'
import spellReducer from './spell/spellReducer';
import abilityReducer from './ability/abilityRecucer';
import inventoryReducer from './invenotry/inventoryReducer';

const rootReducer = combineReducers({
  stats: statReducer,
  spells: spellReducer,
  abilities: abilityReducer,
  inventory: inventoryReducer,
});

export default rootReducer;
