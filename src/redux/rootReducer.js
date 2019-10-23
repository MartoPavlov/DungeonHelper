import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'
import spellReducer from './spell/spellReducer';
import abilityReducer from './ability/abilityRecucer';

const rootReducer = combineReducers({
  stats: statReducer,
  spells: spellReducer,
  abilities: abilityReducer,
});

export default rootReducer;
