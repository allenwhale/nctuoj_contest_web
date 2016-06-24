import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import NotFound from './components/NotFound';
import Frame from './containers/Frame';
import UserFrame from './containers/UserFrame';
import Contest from './containers/Contest';
import Problem from './containers/Problem';
import SubmissionList from './containers/SubmissionList';

function authenticate(nextState, replaceState) {
    /* do Authenticate
       ...
       replaceState(null, '/login);
       */
    replaceState('/');
}

export const history = browserHistory;

export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Frame}>
                    <Route path="" component={UserFrame}>
                        <IndexRoute component={Contest} />
                        <Route path="problems/:id/" component={Problem}/>
                        <Route path="submissions/" component={SubmissionList}/>
                    </Route>
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
}

