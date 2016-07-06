import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Table, 
    Grid, 
    Row, 
    Col,
    Pagination,
    ControlLabel
} from 'react-bootstrap';
import ContestLeftNav from '../components/ContestLeftNav';
import classNames from 'classnames';
import * as SubmissionActions from './../actions/Submission';
import qs from 'qs';

class SubmissionList extends Component {
    constructor(props) {
        super(props);
        this.getSubmissionList = this.getSubmissionList.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.getSubmissionList();
    }

    getSubmissionList(args) {
        if(!args) args = {};
        var data = {
            token: this.props.user.account.token,
            page: args.page || this.props.location.query.page || 1,
            count: args.count || (this.refs.count && this.refs.count.value) || this.props.location.query.count || 10,
            verdict_id: args.verdict_id || (this.refs.verdict_id && this.refs.verdict_id.value) || this.props.location.query.verdict_id || "",
            problem_id: args.problem_id || (this.refs.problem_id && this.refs.problem_id.value) || this.props.location.query.problem_id || "",
            user_id: args.user_id || (this.refs.user_id && this.refs.user_id.value) || this.props.location.query.user_id || "",
        };
        this.props.dispatch(SubmissionActions.getSubmissionList(data));
    }

    changePage(page) {
        var data = {
            page,
            problem_id: this.refs.problem_id.value || "",
            user_id: this.refs.user_id.value || "",
            verdict_id: this.refs.verdict_id.value || "",
            count: this.refs.count.value || 10,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    changeFilter() {
        var data = {
            page: this.props.location.query.page || 1,
            problem_id: this.refs.problem_id.value || "",
            user_id: this.refs.user_id.value || "",
            verdict_id: this.refs.verdict_id.value || "",
            count: this.refs.count.value || 10,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    render() {
        const pageCount = Math.ceil(this.props.submission.submissionCount / (this.props.location.query.count || 10));
        return (
            <div>
                <Row>
                    <Col md={3}>
                        <ControlLabel>Problem</ControlLabel>
                        <select 
                            ref="problem_id"
                            className="form-control"
                            defaultValue={this.props.location.query.problem_id}
                            onChange={this.changeFilter}
                        >
                            <option value="">All Problems</option>
                            {
                                this.props.problem.problemList.mapArr((row) => (
                                    <option value={row.id}>{problemTitle(row)}</option>
                                ))
                            }
                        </select>
                    </Col>
                    <Col md={3}>
                        <ControlLabel>User ID</ControlLabel>
                        <input 
                            ref="user_id" 
                            type="number"
                            className="form-control"
                            placeholder="All Users"
                            defaultValue={this.props.location.query.user_id}
                            onBlur={this.changeFilter}
                        />
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Verdict</ControlLabel>
                        <select 
                            ref="verdict_id"
                            className="form-control"
                            defaultValue={this.props.location.query.verdict_id}
                            onChange={this.changeFilter}
                        >
                            <option value="">All Verdicts</option>
                            {
                                this.props.verdict.verdictList.mapArr((row) => (
                                    <option value={row.id}>{row.description}</option>
                                    ), true)
                            }    
                        </select>
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Count</ControlLabel>
                        <select 
                            ref="count"
                            className="form-control"
                            defaultValue={this.props.location.query.count}
                            onChange={this.changeFilter}
                        >
                            {
                                [10, 30, 50].map((row) => (
                                    <option value={row}>{row}</option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>
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
                                    <td>{row.time_usage == null ? '--' : row.time_usage}</td>
                                    <td>{row.memory_usage == null ? '--' : row.memory_usage}</td>
                                    <td>
                                        {this.props.verdict.verdictList[row.verdict_id].abbreviation}
                                    </td>
                                    <td>{this.props.execute.executeList[row.execute_type_id].description}</td>
                                    <td>{row.length}</td>
                                    <td>{row.score == null ? '--' : row.score}</td>
                                    <td>{row.created_at}</td>
                                    { this.props.user.account.isADMIN ? <td>{row.ip}</td> : "" }
                                </tr>
                                ), true)
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
