import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import NotFound from './components/NotFound';
import Frame from './containers/Frame';
import Contest from './containers/Contest';
import Problem from './containers/Problem';

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
                    <IndexRoute component={Contest} />
                    <Route path="/problems/:id/" component={Problem}/>
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
}

