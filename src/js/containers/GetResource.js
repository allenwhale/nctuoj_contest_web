import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';
import * as ExecuteActions from './../actions/Execute';
import * as VerdictActions from './../actions/Verdict';
import * as ContestActions from './../actions/Contest';
import * as LanguageActions from './../actions/Language';
import * as ClarificationActions from './../actions/Clarification';
import swal from 'sweetalert';

const CHECK_CONTEST_STATUS_INTERVAL = [1000, 10000];

class GetResource extends Component {
    constructor(props) {
        super(props);
        this.getExecuteList = this.getExecuteList.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.getProblemList = this.getProblemList.bind(this);
        this.getVerdictList = this.getVerdictList.bind(this);
        this.getContest = this.getContest.bind(this);
        this.getLanguageList = this.getLanguageList.bind(this);
        this.getClarificationList = this.getClarificationList.bind(this);
        this.checkContestStatus = this.checkContestStatus.bind(this);
        this.getExecuteList();
        this.getUserList();
        this.getVerdictList();
        this.getContest();
        this.getLanguageList();
        setTimeout(this.checkContestStatus, CHECK_CONTEST_STATUS_INTERVAL[0] * 5);
        this.getClarificationList();
        setInterval(this.getClarificationList, 1000 * 1);
    }

    checkContestStatus() {
        this.getContest();
        const contestStart = new Date(this.props.contest.contest.start);
        const contestEnd = new Date(this.props.contest.contest.end);
        var interval = 0;
        if(this.props.system.time < contestStart) {
            setTimeout(this.checkContestStatus, contestStart - this.props.system.time);
        } else if(this.props.system.time < contestEnd) {
        } else {
            return;
        }
    }

    getContest() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ContestActions.getContest(data))
            .then( ()=>{
                this.getProblemList();
            });
    }

    getProblemList() {
        if(!this.props.user.account.isLOGIN) return;
        if( this.props.contest.contest.status == -1 && !this.props.user.account.isADMIN){
            if(window.location.pathname !== '/')
                window.location = "/";
            return;
        }
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

    getLanguageList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(LanguageActions.getLanguageList(data));
    }

    getClarificationList() {
        if(this.props.user.account.token == undefined) return;
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ClarificationActions.getClarificationList(data));
    }

    render() {
        const getStatus = 
            (this.props.problem.problemListStatus || !this.props.user.account.isLOGIN) &&
            this.props.language.languageListStatus &&
            this.props.user.userListStatus &&
            this.props.execute.executeListStatus &&
            this.props.verdict.verdictListStatus;
        const isIndex = window.location.pathname === '/';
        return (
            <div>
                { getStatus || isIndex ? this.props.children : "" }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        system: state.system,
        user: state.user,
        execute: state.execute,
        problem: state.problem,
        verdict: state.verdict,
        contest: state.contest,
        language: state.language,
    };
}

export default connect(mapStateToProps)(GetResource);

