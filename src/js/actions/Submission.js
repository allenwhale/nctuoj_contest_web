import { createAction } from 'redux-actions';
import Submission from './../utils/Submission';

export const getSubmissionList = createAction('GET_SUBMISSION_LIST', Submission.getSubmissionList);
export const getSubmission = createAction('GET_SUBMISSION', Submission.getSubmission);
export const postSubmission = createAction('POST_SUBMISSION', Submission.postSubmission);
export const openSubmitForm = createAction('OPEN_SUBMIT_FORM');
export const closeSubmitForm = createAction('CLOSE_SUBMIT_FORM');

