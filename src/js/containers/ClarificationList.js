import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Table, 
    Modal, 
    Button, 
    Form, 
    FormGroup, 
    ControlLabel 
} from 'react-bootstrap';

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
            token: this.props.user.account.token, 
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
                            <input type="hidden" name="token" value={this.props.user.account.token} />
                            <FormGroup>
                                <ControlLabel>分類</ControlLabel>
                                <select
                                    className="form-control"
                                    name="problem_id"
                                >
                                    <option value="0">General</option>
                                    {
                                        this.props.problem.problemList.mapArr((row) => (
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
                <Table  striped hover style={{tableLayout: 'fixed'}}>
                    <thead>
                        <tr>
                            <th className="col-md-1">#</th>
                            <th className="col-md-2">分類</th>
                            <th className="col-md-4">Question</th>
                            <th className="col-md-5">Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.clarification.clarificationList.mapArr((row) => (
                            <tr key={row.id} onClick={() => browserHistory.push(`/clarifications/${row.id}/`)}>
                                <td>{row.id}</td>
                                <td>{row.problem_id == 0 ? "General" : this.props.problem.problemList[row.problem_id].title}</td>
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
        user: state.user,
        clarification: state.clarification,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(ClarificationList);
