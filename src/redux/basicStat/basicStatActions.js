import {SET_BASIC_STATS} from './basicStatActionTypes';

export const setBasicStats = (basicStats) => {
  return {
    type: SET_BASIC_STATS,
    stats: basicStats,
  };
}
