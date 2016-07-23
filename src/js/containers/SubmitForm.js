import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Panel,
    Modal,
    Form, 
    FormGroup,
    Row,
    Col,
    FormControl,
    ControlLabel,
    Button,
    Label
} from 'react-bootstrap';
import classNames from 'classnames';
import Codemirror from 'codemirror';
import * as SubmissionActions from './../actions/Submission';
import * as ProblemActions from './../actions/Problem';
require('codemirror/mode/clike/clike');
require('codemirror/mode/python/python');
require('codemirror/keymap/vim');
require('codemirror/keymap/sublime');
require('codemirror/keymap/emacs');

const mapLangMode = [
    '',
    'text/x-c++src',
    'text/x-c++src',
    'text/x-csrc',
    'text/x-java',
    'text/x-python',
    'text/x-python',
];

class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.resetCodemirror = true;
        this.changeExecuteType = this.changeExecuteType.bind(this);
        this.changeKeyMap = this.changeKeyMap.bind(this);
        this.postSubmission = this.postSubmission.bind(this);
        this.closeSubmitForm = this.closeSubmitForm.bind(this);
        this.getProblem = this.getProblem.bind(this);
    }

    getProblem() {
        if(this.resetCodemirror){
            const options = {
                lineNumbers: true,
                matchBrackets: true,
                tabSize: 4,
                indentUnit: 4,
                indentWithTabs: true,
                autofocus: true,
            };
            this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
            this.resetCodemirror = false;
        }
        var data = {
            token: this.props.user.account.token,
            id: this.refs.problemId.value,
        };
        this.props.dispatch(ProblemActions.getProblem(data)).
            then(() => {
                this.code.setOption('mode', mapLangMode[this.props.problem.problem.executes[0].id]);
            });
    }

    closeSubmitForm() {
        this.resetCodemirror = true;
        this.props.dispatch(SubmissionActions.closeSubmitForm());
    }

    postSubmission() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(SubmissionActions.postSubmission(data))
            .then(function() {
                if(this.props.submission.submitStatus)
                    browserHistory.push(`/submissions/${this.props.submission.submission.id}/`);
            }.bind(this));
    }

    changeExecuteType(row) {
        this.code.setOption('mode', mapLangMode[row.target.value]);
    }

    changeKeyMap(row) {
        this.code.setOption('keyMap', row.target.value);
    }

    render() {
        return (
            <div>
                <Modal 
                    show={this.props.submission.submitFormShow} 
                    onHide={this.closeSubmitForm}
                    onEntered={this.getProblem}
                    bsSize="lg"
                >
                    <Modal.Header>
                        <Modal.Title>
                            Submit Your Code
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form  ref="form">
                            <input type="hidden" name="token" value={this.props.user.account.token} />
                            <FormGroup>
                                <Row>
                                    <Col md={12}>
                                        <ControlLabel>Problem</ControlLabel>
                                        <select
                                            className="form-control"
                                            name="problem_id"
                                            ref="problemId"
                                            defaultValue={this.props.problem.problem.id}
                                            onChange={(e) => this.getProblem()}
                                        >
                                            {
                                                this.props.submission.quickSubmit ?
                                                    this.props.problem.problemList.mapArr((row) => (
                                                        <option value={row.id}>{problemTitle(row)}</option>
                                                        )):
                                                <option value={this.props.problem.problem.id}>
                                                    {problemTitle(this.props.problem.problem)}
                                                </option>
                                            } 
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={12}>
                                        <ControlLabel>Language: </ControlLabel>
                                        <select 
                                            className="form-control"
                                            name="execute_type_id" 
                                            ref="execute_type"
                                            onChange={this.changeExecuteType}
                                        >
                                            {
                                                this.props.problem.problem.executes.mapArr((row) => (
                                                    <option key={row.id} value={row.id}>{row.description}</option>
                                                    ))
                                            }
                                        </select>
                                    </Col>
                                    <Col md={6} hidden>
                                        <ControlLabel>keyMap:</ControlLabel>
                                        <select onChange={this.changeKeyMap} className="form-control">
                                            <option value="default">Normal</option>
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6} hidden>
                                        <ControlLabel>File Name: </ControlLabel>
                                        <input name="file_name" className="form-control" />
                                    </Col>
                                    <Col md={12}>
                                        <ControlLabel>Upload File:</ControlLabel>
                                        <input type="file" name="file" className="form-control"/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <ControlLabel>Or paste your code</ControlLabel>
                            <textarea className="form-control" name="code" ref="code"/>
                        </Form>
                        <Button 
                            bsStyle="success" 
                            onClick={() => {
                                //this.code.save();
                                this.postSubmission();
                            }}
                        >Submit</Button>
                        <Button bsStyle="warning" onClick={this.closeSubmitForm}>Cancel</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        problem: state.problem,
        submission: state.submission,
    };
}

export default connect(mapStateToProps)(SubmitForm);
