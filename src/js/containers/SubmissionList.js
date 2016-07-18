import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Table, 
    Grid, 
    Row, 
    Col,
    Button,
    Pagination,
    ControlLabel
} from 'react-bootstrap';
import classNames from 'classnames';
import * as SubmissionActions from './../actions/Submission';
import qs from 'qs';

const REFRESH_INTERVAL = 5000;

class SubmissionList extends Component {
    constructor(props) {
        super(props);
        this.getSubmissionList = this.getSubmissionList.bind(this);
        this.refreshSubmissionList = this.refreshSubmissionList.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeProblemFilter = this.changeProblemFilter.bind(this);
        this.changeUserFilter = this.changeUserFilter.bind(this);
        this.changeVerdictFilter = this.changeVerdictFilter.bind(this);
        this.changeCountFilter = this.changeCountFilter.bind(this);
        this.getCurrentFilter = this.getCurrentFilter.bind(this);
        this.refresh = true;
        this.getSubmissionList();
        setTimeout(this.refreshSubmissionList, REFRESH_INTERVAL);
    }

    componentWillUnmount() {
        this.refresh = false;
    }

    getCurrentFilter() {
        var data = {
            ...this.props.location.query,
        };
        data.count = isNull(data.count) || 10;
        data.page = isNull(data.page) || 1;
        return data;
    }

    refreshSubmissionList() {
        if(this.refresh) {
            this.getSubmissionList();
            setTimeout(this.refreshSubmissionList, REFRESH_INTERVAL);
        }
    }

    getSubmissionList(args) {
        if(!args) args = {};
        var data = {
            ...this.getCurrentFilter(),
            token: this.props.user.account.token,
            ...args,
        };
        this.props.dispatch(SubmissionActions.getSubmissionList(data));
    }

    changePage(page) {
        var data = {
            ...this.getCurrentFilter(),
            page,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    changeProblemFilter(e) {
        var data = {
            ...this.getCurrentFilter(),
            problem_id: e.target.value,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    changeUserFilter(e) {
        var data = {
            ...this.getCurrentFilter(),
            user_id: e.target.value,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    changeVerdictFilter(e) {
        var data = {
            ...this.getCurrentFilter(),
            verdict_id: e.target.value,
        };
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    changeCountFilter(e){
        var data = {
            ...this.getCurrentFilter(),
            count: e.target.value,
        }
        this.getSubmissionList(data);
        browserHistory.push(`/submissions/?${qs.stringify(data)}`);
    }

    render() {
        const pageCount = Math.ceil(this.props.submission.submissionCount / (isNull(this.props.location.query.count) || 10));
        return (
            <div>
                <Row className={classNames('margin-bottom')}>
                    <Col md={3}>
                        <ControlLabel>Problem</ControlLabel>
                        <select 
                            ref="problem_id"
                            className="form-control"
                            defaultValue={this.props.location.query.problem_id}
                            onChange={this.changeProblemFilter}
                        >
                            <option value="">All Problems</option>
                            {
                                this.props.problem.problemList.mapArr((row) => (
                                    <option key={row.id} value={row.id}>{problemTitle(row)}</option>
                                ))
                            }
                        </select>
                    </Col>
                    { this.props.user.account.isADMIN ? 
                        <Col md={3}>
                            <ControlLabel>User ID</ControlLabel>
                            <input 
                                ref="user_id" 
                                type="number"
                                className="form-control"
                                placeholder="All Users"
                                defaultValue={this.props.location.query.user_id}
                                onKeyUp={this.changeUserFilter}
                            />
                        </Col>
                        : ""
                    }
                    <Col md={3}>
                        <ControlLabel>Verdict</ControlLabel>
                        <select 
                            ref="verdict_id"
                            className="form-control"
                            defaultValue={this.props.location.query.verdict_id}
                            onChange={this.changeVerdictFilter}
                        >
                            <option value="">All Verdicts</option>
                            {
                                this.props.verdict.verdictList.mapArr((row) => (
                                    <option key={row.id} value={row.id}>{row.description}</option>
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
                            onChange={this.changeCountFilter}
                        >
                            {
                                [10, 30, 50].map((row) => (
                                    <option key={row} value={row}>{row}</option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button
                            bsStyle="success"
                            onClick={() => this.getSubmissionList()}
                        >Refresh</Button>
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
