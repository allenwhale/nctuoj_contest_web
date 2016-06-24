import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import base from './base';
import login from './Login';
import problem from './Problem';
import submitForm from './SubmitForm';

export default combineReducers({
    base,
    login,
    problem,
    submitForm,
    routing,
});
