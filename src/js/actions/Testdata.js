import { createAction } from 'redux-actions';
import Testdata from './../utils/Testdata';

export const getTestdataList = createAction('GET_TESTDATA_LIST', Testdata.getTestdataList);
export const getTestdata = createAction('GET_TESTDATA');
export const postTestdata = createAction('POST_TESTDATA', Testdata.postTestdata);
export const putTestdata = createAction('PUT_TESTDATA', Testdata.putTestdata);
export const deleteTestdata = createAction('DELETE_TESTDATA', Testdata.deleteTestdata);
export const activeSubmit = createAction('ACTIVE_SUBMIT');
export const disableSubmit = createAction('DISABLE_SUBMIT');
