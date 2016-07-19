import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import {
    Grid,
    Table,
    Button,
    Modal
} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import * as ScoreboardActions from './../actions/Scoreboard';
import * as SubmissionActions from './../actions/Submission';
import * as UserActions from './../actions/User';
import * as VerdictActions from './../actions/Verdict';
import classNames from 'classnames';
require('./../../assets/styles/scoreboard.sass');
const REFRESH_INTERVAL = 5000;

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.getScoreboard = this.getScoreboard.bind(this);
        this.refreshScoreboard = this.refreshScoreboard.bind(this);
        this.openScoreboardDetail = this.openScoreboardDetail.bind(this);
        this.closeScoreboardDetail = this.closeScoreboardDetail.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.getVerdictList = this.getVerdictList.bind(this);
        this.refresh = true;
        this.getScoreboard();
        this.getUserList();
        this.getVerdictList();
        setTimeout(this.refreshScoreboard, REFRESH_INTERVAL);
    }

    componentWillUnmount() {
        this.refresh = false;
    }

    getUserList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(UserActions.getUserList(data));
    }

    getVerdictList() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(VerdictActions.getVerdictList(data));
    }

    openScoreboardDetail(data) {
        data.token = this.props.user.account.token;
        data.page = 1;
        data.count = 1024;
        console.log(data);
        this.props.dispatch(SubmissionActions.getSubmissionList(data));
        this.props.dispatch(ScoreboardActions.openScoreboardDetail());
    }

    closeScoreboardDetail() {
        this.props.dispatch(ScoreboardActions.closeScoreboardDetail());
    }

    refreshScoreboard() {
        if(this.refresh) {
            this.getScoreboard();
            setTimeout(this.refreshScoreboard, REFRESH_INTERVAL);
        }
    }

    getScoreboard() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ScoreboardActions.getScoreboard(data));
    }

    render() {
        const {users, problems} = this.props.scoreboard.scoreboard.data;
        return (
            <div>
                <Modal
                    show={this.props.scoreboard.scoreboardDetailShow}
                    onHide={this.closeScoreboardDetail}
                    bsSize="large"
                >
                    <Modal.Header>
                        <Modal.Title>Submissions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table responsive hover striped >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Submitter</th>
                                    <th>Time</th>
                                    <th>Memory</th>
                                    <th>Verdict</th>
                                    <th>Score</th>
                                    <th>Submit Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.submission.submissionList.mapArr((row) => (
                                        <tr>
                                            <td>
                                                <a 
                                                    href={`/submissions/${row.id}/`}
                                                    target="_blank"
                                                >
                                                    {row.id}
                                                </a>
                                            </td>
                                            <td>{this.props.user.userList[row.user_id].name}</td>
                                            <td>{row.time_usage}</td>
                                            <td>{row.memory_usage}</td>
                                            <td>{this.props.verdict.verdictList[row.verdict_id].abbreviation}</td>
                                            <td>{row.score}</td>
                                            <td>{row.created_at}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            bsStyle="warning"
                            onClick={this.closeScoreboardDetail}
                        >Close</Button>
                    </Modal.Footer>
                </Modal>
                <Grid>
                    <Table hover bordered condensed responsive >
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>Solved</th>
                                <th>Penalty</th>
                                {
                                    problems.map((row) => (
                                        <th key={row.id}>{chr(ord('A') + row.id - 1)}</th>
                                        ))
                                }
                            </tr>
                        </thead>
                        <FlipMove typeName="tbody" easing="cubic-bezier(0, 0.7, 0.8, 0.1)" enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
                            {
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.rank}</td>
                                        <td>{user.name}</td>
                                        <td>{user.ac}</td>
                                        <td>{user.penalty}</td>
                                        {
                                            user.problems.map((problem) => {
                                                var className = "";
                                                var text = "";
                                                var onClick = () => {};
                                                if(this.props.user.account.isADMIN) {
                                                    onClick = () => this.openScoreboardDetail({
                                                        problem_id: problem.id,
                                                        user_id: user.id,
                                                    });
                                                }
                                                if(problem.verdict_id == 0) {
                                                }else if(problem.verdict_id <= 2) {
                                                    className = "pending";
                                                    text = problem.attempt;
                                                }else if(problem.verdict_id == 10) {
                                                    className = "ac";
                                                    text = `${problem.attempt}/${problem.ac_time}`;
                                                }else{
                                                    className = "wa";
                                                    text = problem.attempt;
                                                }
                                                return (
                                                    <td
                                                        key={problem.id}
                                                        className={className}
                                                        onClick={onClick}
                                                    >
                                                        {text}
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr> 
                                ))
                            } 
                            <tr>
                                <td></td>
                                <td><strong>Solved / Attempts</strong></td>
                                <td></td>
                                <td></td>
                                {
                                    problems.map((problem) => (
                                        <td>{`${problem.ac}/${problem.attempt}`}</td>
                                    ))
                                }
                            </tr>
                        </FlipMove>
                    </Table>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        scoreboard: state.scoreboard,
        submission: state.submission,
        verdict: state.verdict,
    };
}

export default connect(mapStateToProps)(Scoreboard);

