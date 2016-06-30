import { createAction } from 'redux-actions';
import Verdict from './../utils/Verdict';

export const getVerdictList = createAction('GET_VERDICT_LIST', Verdict.getVerdictList);
