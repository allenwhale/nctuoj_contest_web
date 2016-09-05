import { createAction } from 'redux-actions';
import DB from './../utils/DB';

export const deleteTable = createAction('', DB.deleteTable);
