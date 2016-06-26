import { createAction } from 'redux-actions';
import Execute from './../utils/Execute';

export const getExecuteList = createAction('GET_EXECUTE_LIST', Execute.getExecuteList);
export const deleteExecute = createAction('DELETE_EXECUTE', Execute.deleteExecute);
export const openNewExecute = createAction('OPEN_NEW_EXECUTE');
export const closeNewExecute = createAction('CLOSE_NEW_EXECUTE');
