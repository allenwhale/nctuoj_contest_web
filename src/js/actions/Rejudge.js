import { createAction } from 'redux-actions';
import Rejudge from '../utils/Rejudge';

export const RejudgeSubmission = createAction('REJUDGE_SUBMISSION', Rejudge.RejudgeSubmission);
export const RejudgeProblem    = createAction('REJUDGE_PROBLEM', Rejudge.RejudgeProblem);


