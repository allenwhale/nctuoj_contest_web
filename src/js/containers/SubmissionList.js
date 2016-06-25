import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Table, Grid, Row, Col } from 'react-bootstrap';
import ContestLeftNav from '../components/ContestLeftNav';

import classNames from 'classnames';
import * as SubmissionActions from './../actions/Submission';
import * as ProblemActions from './../actions/Problem';

class SubmissionList extends Component {
    constructor(props) {
        super(props);
        this.getSubmissionList = this.getSubmissionList.bind(this);
        this.getSubmissionList();
    }


    getSubmissionList() {
        this.props.dispatch(SubmissionActions.getSubmissionList());
    }

    onClick(row) {
        alert(row);

    }

    render() {
        return (
            <div>
                <Table responsive striped hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Problem</th>
                            <th>Submitter</th>
                            <th>Time</th>
                            <th>Memory</th>
                            <th>Verdict</th>
                            <th>Compiler</th>
                            <th>Length</th>
                            <th>Score</th>
                            <th>Submit Time</th>
                            { this.props.login.account.isADMIN ? (<th>IP</th>) : (null) }
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            this.props.submission.submissionList.map((row) => (
                                <tr id={row.id} 
                                    onClick={() => {this.onClick(row.id)}}
                                    onHover={() => {console.log(row.id);}}
                                >
                                    <td>{row.id}</td>
                                    <td>{row.problem_title}</td>
                                    <td>{row.user}</td>
                                    <td>{row.time_usage}</td>
                                    <td>{row.memory_usage}</td>
                                    <td>{row.verdict}</td>
                                    <td>{row.execute_type}</td>
                                    <td>{row.length}</td>
                                    <td>{row.score}</td>
                                    <td>{row.created_at}</td>
                                    { this.props.login.account.isADMIN ? <td>row.ip</td> : null }
                                </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        submission: state.submission,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(SubmissionList);
