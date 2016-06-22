import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import base from './base';
import login from './Login';

export default combineReducers({
    base,
    login,
    routing,
});
