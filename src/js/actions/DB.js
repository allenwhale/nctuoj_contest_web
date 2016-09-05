import { createAction } from 'redux-actions';
import DB from './../utils/DB';

export const deleteTable = createAction('DELETE_TABLE', DB.deleteTable);
