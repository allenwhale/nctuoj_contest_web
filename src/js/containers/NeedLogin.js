import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'

import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';
import * as ExecuteActions from './../actions/Execute';
import * as VerdictActions from './../actions/Verdict';

class NeedUser extends Component {
    constructor(props) {
        super(props);
        this.checkIsUser = this.checkIsUser.bind(this);
        this.getExecuteList = this.getExecuteList.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.getProblemList = this.getProblemList.bind(this);
        this.getVerdictList = this.getVerdictList.bind(this);
        this.checkIsUser();
        this.getExecuteList();
        this.getUserList();
        this.getProblemList();
        this.getVerdictList();
    }

    getProblemList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ProblemActions.getProblemList(data));
    }

    getExecuteList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ExecuteActions.getExecuteList(data));
    }

    getVerdictList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(VerdictActions.getVerdictList(data));
    }

    getUserList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(UserActions.getUserList(data));
    }

    checkIsUser() {
        if(!this.props.user.account.isLOGIN) {
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                { this.props.user.userListStatus &&
                    this.props.execute.executeListStatus &&
                    this.props.problem.problemListStatus &&
                    this.props.verdict.verdictListStatus ?
                    this.props.children : "" }
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
    };
}

export default connect(mapStateToProps)(NeedUser);
