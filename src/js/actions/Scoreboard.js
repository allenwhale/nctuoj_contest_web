import { createAction } from 'redux-actions';
import Scoreboard from '../utils/Scoreboard';

export const getScoreboard = createAction('GET_SCOREBOARD', Scoreboard.getScoreboard);

