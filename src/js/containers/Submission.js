import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Codemirror from 'codemirror';

import { 
    Panel, 
    Row, 
    Col,
    Table
} from 'react-bootstrap';
import * as SubmissionActions from './../actions/Submission';
import * as ProblemActions from './../actions/Problem';
import * as ExecuteActions from './../actions/Execute';
import * as VerdictActions from './../actions/Verdict';

import classNames from 'classnames';

const map_lang_mode = {
    'C': 'text/x-csrc',
    'C++': 'text/x-c++src',
    'Python': 'text/x-python',
};

class Submission extends Component {
    constructor(props) {
        super(props);
        this.getSubmission = this.getSubmission.bind(this);
        this.prevStatus = false;
        this.getSubmission();
    }

    getSubmission() {
        var data = {
            token: this.props.user.account.token,
            id: this.props.params.id,
        };
        this.props.dispatch(SubmissionActions.getSubmission(data));
    }

    componentDidUpdate() {
        console.log(this.prevStatus, this.props.submission.submissionStatus);
        if(this.prevStatus == false && this.props.submission.submissionStatus) {
            const options = {
                lineNumbers: true,
                matchBrackets: true,
                tabSize: 4,
                indentUnit: 4,
                indentWithTabs: true,
                autofocus: true,
                mode: map_lang_mode[this.props.execute.executeList[this.props.submission.submission.execute_type_id].description],
            };
            console.log(this.refs.code, ReactDOM.findDOMNode(this.refs.code));
            this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
        }
        this.prevStatus = this.props.submission.submissionStatus;
    }

    render() {
        return (
            this.props.submission.submissionStatus ? 
            <div>
                <Row>
                    <Col md={12}>
                        <h2 className={classNames('text-center')}>
                            Submission #{this.props.params.id}
                        </h2>
                    </Col>
                </Row>
                <Panel header={ 
                    <Row> 
                        <Col xs={2}>Problem</Col> 
                        <Col xs={2}>Submitter</Col>
                        <Col xs={2}>Time(ms)</Col>
                        <Col xs={2}>Memory(KiB)</Col>
                        <Col xs={2}>Verdict</Col>
                        <Col xs={2}>Score</Col> 
                    </Row> }
                >
                    <Row>
                        <Col xs={2}>
                            {this.props.problem.problemList[this.props.submission.submission.problem_id].title}
                        </Col> 
                        <Col xs={2}>
                            {this.props.user.userList[this.props.submission.submission.user_id].name}
                        </Col> 
                        <Col xs={2}>{this.props.submission.submission.time_usage}</Col> 
                        <Col xs={2}>{this.props.submission.submission.memory_usage}</Col> 
                        <Col xs={2}>{this.props.verdict.verdictList[this.props.submission.submission.verdict_id].abbreviation}</Col> 
                        <Col xs={2}>{this.props.submission.submission.score}</Col> 
                    </Row> 
                </Panel>
                { this.props.user.account.isADMIN ? 
                    <Panel header={
                        <Row>
                            <Col xs={3}>Compiler</Col>
                            <Col xs={3}>Execute Type</Col>
                            <Col xs={3}>Code Length</Col>
                            <Col xs={3}>IP</Col>
                        </Row>}
                    >
                        <Row>
                            <Col xs={3}>Compiler</Col>
                            <Col xs={3}>{this.props.execute.executeList[this.props.submission.submission.execute_type_id].description}</Col>
                            <Col xs={3}>{this.props.submission.submission.score}</Col>
                            <Col xs={3}>{this.props.submission.submission.ip}</Col>
                        </Row>
                    </Panel> :
                        <Panel header={
                            <Row>
                                <Col xs={4}>Compiler</Col>
                                <Col xs={4}>Execute Type</Col>
                                <Col xs={4}>Code Length</Col>
                            </Row>}
                        >
                            <Row>
                                <Col xs={4}>Compiler</Col>
                                <Col xs={4}>{this.props.execute.executeList[this.props.submission.submission.execute_type_id].description}</Col>
                                <Col xs={4}>{this.props.submission.submission.score}</Col>
                            </Row>
                        </Panel>
                        } 
                <Table responsive striped hover >
                    <thead>
                        <tr>
                            <th>#</th> 
                            <th>Time</th> 
                            <th>Memory</th> 
                            <th>Verdict</th> 
                            <th>Score</th> 
                        </tr> 
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                <textarea 
                    ref="code" 
                    defaultValue={this.props.submission.submission.code} 
                />
            </div> : <div></div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        problem: state.problem,
        execute: state.execute,
        verdict: state.verdict,
        submission: state.submission,
    };
}

export default connect(mapStateToProps)(Submission);
