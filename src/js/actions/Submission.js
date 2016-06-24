import { createAction } from 'redux-actions';
import Submission from './../utils/Submission';

export const getSubmissions = createAction('GET_SUBMISSIONS', Submission.getSubmissions);

