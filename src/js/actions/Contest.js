import { createAction } from 'redux-actions';
import Contest from './../utils/Contest';

export const getContest = createAction('GET_CONTEST', Contest.getContest);
export const putContest = createAction('PUT_CONTEST', Contest.putContest);
