import { createAction } from 'redux-actions';
import System from './../utils/System';

export const getTime = createAction('GET_TIME', System.getTime);
