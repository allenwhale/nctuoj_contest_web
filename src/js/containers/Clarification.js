import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Table, Modal, Button, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import classNames from 'classnames';
import * as ClarificationActions from '../actions/Clarification';


class ClarificationList extends Component {
    constructor(props) {
        super(props);
        this.getClarificationList = this.getClarificationList.bind(this);
        this.postClarification = this.postClarification.bind(this);
        this.openNewClarificationForm = this.openNewClarificationForm.bind(this);
        this.closeNewClarificationForm = this.closeNewClarificationForm.bind(this);
        this.getClarificationList();
    }

    getClarificationList() {
        var data = {
            token: this.props.login.account.token, 
        };
        this.props.dispatch(ClarificationActions.getClarificationList(data));
    }

    openNewClarificationForm() {
        this.props.dispatch(ClarificationActions.openNewClarificationForm());
    }

    closeNewClarificationForm() {
        this.props.dispatch(ClarificationActions.closeNewClarificationForm());
    }

    postClarification() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(ClarificationActions.postClarification(data));
    }

    render() {
        return (
            <div>
                <Button
                    bsStyle="success"
                    onClick={this.openNewClarificationForm}
                >
                    New
                </Button>
                <Modal
                    show={this.props.clarification.newClarificationShow}
                    onHide={this.closeNewClarificationForm}
                >
                    <Modal.Header>
                        <Modal.Title>New Clarification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form ref="form">
                            <input type="hidden" name="token" value={this.props.login.account.token} />
                            <FormGroup>
                                <ControlLabel>分類</ControlLabel>
                                <select
                                    className="form-control"
                                    name="problem_id"
                                >
                                    <option value="0">General</option>
                                    {
                                        this.props.problem.problemList.map((row) => (
                                            <option key={row.id} value={row.id}>{`${row.id}. ${row.title}`}</option>
                                            ))
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel> Question </ControlLabel>
                                <textarea 
                                    className="form-control"
                                    name="question"
                                /> 
                            </FormGroup>

                        </Form>
                    </Modal.Body>                
                    <Modal.Footer>
                        <Button 
                            bsStyle="warning" 
                            onClick={this.closeNewClarificationForm}
                        >
                            Close
                        </Button>
                        <Button
                            bsStyle="success"
                            onClick={this.postClarification}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table responsive striped hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Question</th>
                            <th>Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.clarification.clarificationList.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td className="ellipsis">{row.question}</td>
                                <td className="ellipsis">{row.reply}</td>
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
        clarification: state.clarification,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(ClarificationList);
