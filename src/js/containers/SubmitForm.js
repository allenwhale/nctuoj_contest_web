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
require('codemirror/mode/clike/clike');
require('codemirror/mode/python/python');
require('codemirror/keymap/vim');
require('codemirror/keymap/sublime');
require('codemirror/keymap/emacs');

const mapLangMode = {
    'C': 'text/x-csrc',
    'C++11': 'text/x-c++src',
    'C++14': 'text/x-c++src',
    'Python2': 'text/x-python',
    'Python3': 'text/x-python',
    'Jave': 'text/x-java',
};

class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.changeExecuteType = this.changeExecuteType.bind(this);
        this.changeKeyMap = this.changeKeyMap.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.postSubmission = this.postSubmission.bind(this);
        this.closeSubmitForm = this.closeSubmitForm.bind(this);
    }

    closeSubmitForm() {
        this.props.dispatch(SubmissionActions.closeSubmitForm());
    }

    postSubmission() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(SubmissionActions.postSubmission(data))
            .then(function() {
                console.log(this.props.submission);
                if(this.props.submission.submitStatus)
                    browserHistory.push(`/submissions/${this.props.submission.submission.id}/`);
            }.bind(this));
    }

    onEntered() {
        const options = {
            lineNumbers: true,
            matchBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            autofocus: true,
            mode: mapLangMode[ReactDOM.findDOMNode(this.refs['execute_type']).value]
        };
        this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
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
                    onEntered={this.onEntered}
                    bsSize="lg"
                >
                    <Modal.Header>
                        <Modal.Title>
                            Submit Code
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
                                            defaultValue={this.props.problem.problem.id}
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
                                    <Col md={6}>
                                        <ControlLabel>Execute Type: </ControlLabel>
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
                                    <Col md={6}>
                                        <ControlLabel>keyMap:</ControlLabel>
                                        <select onChange={this.changeKeyMap} className="form-control">
                                            <option value="default">Normal</option>
                                            <option value="vim">Vim</option>
                                            <option value="sublime">Sublime</option>
                                            <option value="emacs">Emacs</option>
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <ControlLabel>File Name: </ControlLabel>
                                        <input name="file_name" className="form-control" />
                                    </Col>
                                    <Col md={6}>
                                        <ControlLabel>File:</ControlLabel>
                                        <input type="file" name="file" className="form-control"/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <textarea className="form-control" name="code" ref="code"/>
                        </Form>
                        <Button 
                            bsStyle="success" 
                            onClick={() => {
                                this.code.save();
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
