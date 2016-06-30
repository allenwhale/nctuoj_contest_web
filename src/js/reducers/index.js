import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import base from './base';
import user from './User';
import problem from './Problem';
import submission from './Submission';
import execute from './Execute';
import testdata from './Testdata';
import clarification from './Clarification';
import verdict from './Verdict';
import system from './System';

export default combineReducers({
    base,
    user,
    problem,
    submission,
    execute,
    testdata,
    clarification,
    verdict,
    system,
    routing,
});
