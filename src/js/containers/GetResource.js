import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';
import * as ExecuteActions from './../actions/Execute';
import * as VerdictActions from './../actions/Verdict';
import * as ContestActions from './../actions/Contest';
import * as LanguageActions from './../actions/Language';

class GetResource extends Component {
    constructor(props) {
        super(props);
        this.getExecuteList = this.getExecuteList.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.getProblemList = this.getProblemList.bind(this);
        this.getVerdictList = this.getVerdictList.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getLanguageList = this.getLanguageList.bind(this);
        this.getExecuteList();
        this.getUserList();
        this.getProblemList();
        this.getVerdictList();
        this.getContest();
        this.getLanguageList();
    }

    getContest() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ContestActions.getContest(data));
    }

    getProblemList() {
        if(!this.props.user.account.isLOGIN) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ProblemActions.getProblemList(data));
    }

    getExecuteList() {
        if(!this.props.user.account.isLOGIN) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ExecuteActions.getExecuteList(data));
    }

    getVerdictList() {
        if(!this.props.user.account.isLOGIN) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(VerdictActions.getVerdictList(data));
    }

    getUserList() {
        if(!this.props.user.account.isLOGIN) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(UserActions.getUserList(data));
    }

    getLanguageList() {
        if(!this.props.user.account.isLOGIN) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(LanguageActions.getLanguageList(data));
    }

    render() {
        return (
            <div>
                {   this.props.language.languageListStatus &&
                    this.props.problem.problemListStatus &&
                    this.props.user.userListStatus &&
                    this.props.execute.executeListStatus &&
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
        contest: state.contest,
        language: state.language,
    };
}

export default connect(mapStateToProps)(GetResource);

