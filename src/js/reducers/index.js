import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import user from './User';
import problem from './Problem';
import submission from './Submission';
import execute from './Execute';
import testdata from './Testdata';
import clarification from './Clarification';
import verdict from './Verdict';
import contest from './Contest';
import system from './System';
import language from './Language';
import scoreboard from './Scoreboard';

export default combineReducers({
    user,
    contest,
    problem,
    submission,
    execute,
    testdata,
    clarification,
    verdict,
    language,
    scoreboard,
    system,
    routing,
});
