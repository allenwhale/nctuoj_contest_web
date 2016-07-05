import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'

import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';
import * as ExecuteActions from './../actions/Execute';
import * as VerdictActions from './../actions/Verdict';
import * as ContestActions from './../actions/Contest';

class NeedUser extends Component {
    constructor(props) {
        super(props);
        this.checkIsLogin = this.checkIsLogin.bind(this);
        this.checkIsLogin();
    }

    checkIsLogin() {
        if(!this.props.user.account.isLOGIN) {
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                { this.props.children } 
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        execute: state.execute,
        problem: state.problem,
        verdict: state.verdict,
        contest: state.contest,
    };
}

export default connect(mapStateToProps)(NeedUser);
