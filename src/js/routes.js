import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import NotFound from './components/NotFound';
import Frame from './containers/Frame';
import NeedLogin from './containers/NeedLogin';
import UserFrame from './containers/UserFrame';
import Contest from './containers/Contest';
import Problem from './containers/Problem';
import SubmissionList from './containers/SubmissionList';
import Submission from './containers/Submission';

function authenticate(nextState, replaceState) {
    console.log(nextState);
    console.log(replaceState);
    /* do Authenticate
       ...
       replaceState(null, '/login);
       */
    //replaceState('/');
}

export const history = browserHistory;

export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Frame}>
                    <Route path="" component={NeedLogin}>
                        <Route path="" component={UserFrame}>
                            <IndexRoute component={Contest} />
                            <Route path="problems/:id/" component={Problem}/>
                            <Route path="submissions/" component={SubmissionList}/>
                            <Route path="submissions/:id/" component={Submission}/>
                        </Route>
                    </Route>
                </Route>
                <Route path="*" component={NotFound} />
            </Router>
        );
    }
}

