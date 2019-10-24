import {combineReducers} from 'redux';
import statReducer from './stat/statReducer'
import spellReducer from './spell/spellReducer';
import abilityReducer from './ability/abilityRecucer';
import invenotryReducer from './invenotry/invenotryReducer';

const rootReducer = combineReducers({
  stats: statReducer,
  spells: spellReducer,
  abilities: abilityReducer,
  invenotry: invenotryReducer,
});

export default rootReducer;
