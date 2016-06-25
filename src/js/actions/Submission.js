import { createAction } from 'redux-actions';
import Submission from './../utils/Submission';

export const getSubmissionList = createAction('GET_SUBMISSION_LIST', Submission.getSubmissionList);
export const getSubmission = createAction('GET_SUBMISSION', Submission.getSubmission);

