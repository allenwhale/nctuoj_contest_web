import { createAction } from 'redux-actions';
import Problem from '../utils/Problem';

export const getProblemList = createAction('GET_PROBLEM_LIST', Problem.getProblemList);
export const getProblem = createAction('GET_PROBLEM', Problem.getProblem);
export const postProblem = createAction('POST_PROBLEM', Problem.postProblem);
export const postProblemMeta = createAction('POST_PROBLEM', Problem.postProblemMeta);
export const putProblem = createAction('PUT_PROBLEM', Problem.putProblem);
export const putProblemMeta = createAction('PUT_PROBLEM', Problem.putProblemMeta);
export const openNewProblemForm = createAction('OPEN_NEW_PROBLEM_FORM');
export const closeNewProblemForm = createAction('CLOSE_NEW_PROBLEM_FORM');
export const closeProblemErrMsg = createAction('CLOSE_PROBLEM_ERR_MSG');
export const addProblemExecute = createAction('ADD_PROBLEM_EXECUTE');
export const deleteProblemExecute = createAction('DELETE_PROBLEM_EXECUTE');
export const putProblemExecute = createAction('PUT_PROBLEM_EXECUTE', Problem.putProblemExecute);
export const putProblemVerdict = createAction('PUT_PROBLEM_VERDICT', Problem.putProblemVerdict);
