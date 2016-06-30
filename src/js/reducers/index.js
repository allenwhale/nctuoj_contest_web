import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import base from './base';
import login from './Login';
import problem from './Problem';
import submission from './Submission';
import execute from './Execute';
import testdata from './Testdata';
import clarification from './Clarification';
import system from './System';

export default combineReducers({
    base,
    login,
    problem,
    submission,
    execute,
    testdata,
    clarification,
    system,
    routing,
});
