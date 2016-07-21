import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import NotFound from './components/NotFound';
import Frame from './containers/Frame';
import Special from './components/Special';
import NeedLogin from './containers/NeedLogin';
import GetResource from './containers/GetResource';
import User from './containers/User';
import NeedAdmin from './containers/admin/NeedAdmin';
import UserFrame from './containers/UserFrame';
import Contest from './containers/Contest';
import Problem from './containers/Problem';
import SubmissionList from './containers/SubmissionList';
import Submission from './containers/Submission';
import ClarificationList from './containers/ClarificationList';
import Clarification from './containers/Clarification';
import AdminFrame from './components/admin/AdminFrame';
import AdminContest from './containers/admin/Contest';
import AdminProblemList from './containers/admin/ProblemList';
import AdminProblem from './containers/admin/Problem';
import AdminExecuteList from './containers/admin/ExecuteList';
import AdminExecute from './containers/admin/Execute';
import AdminUserList from './containers/admin/UserList';
import AdminUser from './containers/admin/User';
import Scoreboard from './containers/Scoreboard';

export const history = browserHistory;

export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Frame}>
                    <Route path="" component={NeedLogin}>
                        <Route path="" component={GetResource}>
                            <Route path="" component={UserFrame}>
                                <IndexRoute component={Contest} />
                                <Route path="user/" component={User} />
                                <Route path="problems/:id/" component={Problem}/>
                                <Route path="submissions/" component={SubmissionList}/>
                                <Route path="submissions/:id/" component={Submission}/>
                                <Route path="clarifications/" component={ClarificationList}/>
                                <Route path="clarifications/:id/" component={Clarification}/>
                            </Route>
                            <Route path="admin/" component={NeedAdmin}>
                                <Route path="" component={AdminFrame}>
                                    <IndexRoute component={AdminContest}/>
                                    <Route path="problems/" component={AdminProblemList} />
                                    <Route path="problems/:id/" component={AdminProblem} />
                                    <Route path="executes/" component={AdminExecuteList}/>
                                    <Route path="executes/:id/" component={AdminExecute}/>
                                    <Route path="users/" component={AdminUserList} />
                                    <Route path="users/:id/" component={AdminUser} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="scoreboard/" component={Scoreboard}/>
                    <Route path="special/" component={Special} />
                </Route>
                <Route path="*" component={NotFound} />
            </Router>
        );
    }
}

