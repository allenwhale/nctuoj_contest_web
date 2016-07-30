import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Codemirror from 'codemirror';
import { 
    Panel, 
    Row, 
    Col,
    Table,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';
import * as SubmissionActions from './../actions/Submission';
import * as RejudgeActions from './../actions/Rejudge';

import classNames from 'classnames';

const mapLangMode = [
    '',
    'text/x-csrc',
    'text/x-c++src',
    'text/x-c++src',
    'text/x-java',
    'text/x-python',
    'text/x-python',
];

const REFRESH_INTERVAL = 2000;

class Submission extends Component {
    constructor(props) {
        super(props);
        this.getSubmission = this.getSubmission.bind(this);
        this.checkSubmissionPending = this.checkSubmissionPending.bind(this);
        this.RejudgeSubmission = this.RejudgeSubmission.bind(this);
        this.prevStatus = false;
        this.getSubmission();
        this.refresh = true; 
        setTimeout(this.checkSubmissionPending, REFRESH_INTERVAL);
        this.preCode = '';
    }

    componentWillUnmount() {
        this.refresh = false;
    }

    checkSubmissionPending() {
        if(this.props.submission.submission.verdict_id <= 2 && this.refresh) {
            this.getSubmission();
            setTimeout(this.checkSubmissionPending, REFRESH_INTERVAL);
        }
    }

    getSubmission() {
        var data = {
            token: this.props.user.account.token,
            id: this.props.params.id,
        };
        this.props.dispatch(SubmissionActions.getSubmission(data))
            .then(()=>{
                if(this.preCode != this.props.submission.submission.code){
                    const options = {
                        lineNumbers: true,
                        matchBrackets: true,
                        tabSize: 4,
                        indentUnit: 4,
                        indentWithTabs: true,
                        autofocus: false,
                        mode: mapLangMode[this.props.execute.executeList[this.props.submission.submission.execute_type_id].id],
                    };
                    this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
                    this.preCode = this.props.submission.submission.code;
                }

            });
    }

    RejudgeSubmission(id) {
        swal({
            title: `Rejudge Submission #${id}?`,
            text: `Do you readly want to rejudge submission #${id}?`,
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: true,
        }, () => {
            var data = new FormData();
            data.append('token', this.props.user.account.token);
            data.append('id', id);
            this.props.dispatch(RejudgeActions.RejudgeSubmission(data));
        });
    }

    componentDidUpdate() {
        if(this.prevStatus == false && this.props.submission.submissionStatus) {
        }
        this.prevStatus = this.props.submission.submissionStatus;
    }

    render() {
        return (
            <div key={this.props.submission.submission.id}>
                <Row>
                    <Col md={12}>
                        <h2 className={classNames('text-center')}>
                            Submission #{this.props.params.id}
                            {' '}
                            { this.props.submission.submission.verdict_id <= 2 ?
                                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> : <span></span>
                                }
                        </h2>
                    </Col>
                </Row>
                { this.props.user.account.isADMIN ? 
                    <Row>
                        <Col md={2}>
                            <Button 
                                bsClass="btn btn-default btn-sm btn-block"
                                onClick={()=>this.RejudgeSubmission(this.props.params.id)}
                            >Rejudge</Button>
                        </Col> 
                    </Row> : ""
                }
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
                            <Col xs={4}>Language</Col>
                            <Col xs={4}>Code Length</Col>
                            <Col xs={4}>IP</Col>
                        </Row>}
                    >
                        <Row>
                            <Col xs={4}>{this.props.execute.executeList[this.props.submission.submission.execute_type_id].description}</Col>
                            <Col xs={4}>{this.props.submission.submission.length}</Col>
                            <Col xs={4}>{this.props.submission.submission.ip}</Col>
                        </Row>
                    </Panel> :
                        <Panel header={
                            <Row>
                                <Col xs={6}>Language</Col>
                                <Col xs={6}>Code Length</Col>
                            </Row>}
                        >
                            <Row>
                                <Col xs={6}>{this.props.execute.executeList[this.props.submission.submission.execute_type_id].description}</Col>
                                <Col xs={6}>{this.props.submission.submission.length}</Col>
                            </Row>
                        </Panel>
                        } 
                { this.props.user.account.isADMIN ? 
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
                            {
                                this.props.submission.submission.testdata.map((row, idx) => (
                                    <tr key={idx}>
                                        <td>{ idx + 1}</td>
                                        <td>{ row.time_usage }</td>
                                        <td>{ row.memory_usage }</td>
                                        <td>{ this.props.verdict.verdictList[row.verdict_id].abbreviation }</td>
                                        <td>{ row.score }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table> : ""
                }
                {
                    this.props.submission.submission.verdict_id == 4 ? 
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Compile Error Message</ControlLabel>
                            <FormControl componentClass="textarea" rows="10" defaultValue={this.props.submission.submission.ce[0].note} />
                        </FormGroup> : ""
                }
                <textarea 
                    ref="code" 
                    defaultValue={this.props.submission.submission.code} 
                />
            </div>
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
