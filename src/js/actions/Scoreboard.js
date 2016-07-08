import { createAction } from 'redux-actions';
import Scoreboard from '../utils/Scoreboard';

export const getScoreboard = createAction('GET_SCOREBOARD', Scoreboard.getScoreboard);
export const openScoreboardDetail = createAction('OPEN_SCOREBOARD_DETAIL');
export const closeScoreboardDetail = createAction('CLOSE_SCOREBOARD_DETAIL');
export const updateScoreboardDetail = createAction('UPDATE_SCOREBOARD_DETAIL');

