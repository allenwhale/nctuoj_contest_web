import { createAction } from 'redux-actions';
import Execute from './../utils/Execute';

export const getExecuteList = createAction('GET_EXECUTE_LIST', Execute.getExecuteList);
export const getExecute = createAction('GET_EXECUTE', Execute.getExecute);
export const putExecute = createAction('PUT_EXECUTE', Execute.putExecute);
export const deleteExecute = createAction('DELETE_EXECUTE', Execute.deleteExecute);
export const postExecute = createAction('POST_EXECUTE', Execute.postExecute);
export const openNewExecute = createAction('OPEN_NEW_EXECUTE');
export const closeNewExecute = createAction('CLOSE_NEW_EXECUTE');
export const addCommand = createAction('ADD_COMMAND');
export const deleteCommand = createAction('DELETE_COMMAND');
export const updateCommand = createAction('UPDATE_COMMAND');
