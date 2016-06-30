import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Table, 
    Grid, 
    Row, 
    Col,
    Pagination
} from 'react-bootstrap';
import ContestLeftNav from '../components/ContestLeftNav';
import classNames from 'classnames';
import * as SubmissionActions from './../actions/Submission';

const SUBMISSION_COUNT = 10;

class SubmissionList extends Component {
    constructor(props) {
        super(props);
        this.getSubmissionList = this.getSubmissionList.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getSubmissionList();
    }

    getSubmissionList(page) {
        var data = {
            token: this.props.user.account.token,
            count: SUBMISSION_COUNT,
            page: page || this.props.location.query.page || 1,
        };
        this.props.dispatch(SubmissionActions.getSubmissionList(data));
    }

    changePage(page) {
        this.getSubmissionList(page);
        browserHistory.push(`/submissions/?page=${page}`);
    }

    render() {
        const pageCount = Math.ceil(this.props.submission.submissionCount / SUBMISSION_COUNT);
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
                            <th>Execute Type</th>
                            <th>Length</th>
                            <th>Score</th>
                            <th>Submit Time</th>
                            { this.props.user.account.isADMIN ? (<th>IP</th>) : (null) }
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            this.props.submission.submissionList.mapArr((row) => (
                                <tr key={row.id} >
                                    <td>
                                        <Link to={`/submissions/${row.id}/`}>
                                            {row.id}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/problems/${row.problem_id}/`}>
                                            {this.props.problem.problemList[row.problem_id].title}
                                        </Link>
                                    </td>
                                    <td>{this.props.user.userList[row.user_id].name}</td>
                                    <td>{row.time_usage}</td>
                                    <td>{row.memory_usage}</td>
                                    <td>
                                        {this.props.verdict.verdictList[row.verdict_id].abbreviation}
                                    </td>
                                    <td>{this.props.execute.executeList[row.execute_type_id].description}</td>
                                    <td>{row.length}</td>
                                    <td>{row.score}</td>
                                    <td>{row.created_at}</td>
                                    { this.props.user.account.isADMIN ? <td>{row.ip}</td> : null }
                                </tr>
                                ))
                        }
                    </tbody>
                </Table>
                <Pagination 
                    key={pageCount}
                    prev
                    next
                    first
                    last
                    ellipsis
                    items={pageCount}
                    activePage={parseInt(this.props.location.query.page) || 1}
                    onSelect={this.changePage}
                    maxButtons={5}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        submission: state.submission,
        problem: state.problem,
        verdict: state.verdict,
        execute: state.execute,
    };
}

export default connect(mapStateToProps)(SubmissionList);
