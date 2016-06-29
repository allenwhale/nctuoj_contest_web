import { createAction } from 'redux-actions';
import Testdata from './../utils/Testdata';

export const getTestdataList = createAction('GET_TESTDATA_LIST');
export const getTestdata = createAction('GET_TESTDATA');
export const postTestdata = createAction('POST_TESTDATA', Testdata.postTestdata);
export const putTestdata = createAction('PUT_TESTDATA');
export const deleteTestdata = createAction('DELETE_TESTDATA');
