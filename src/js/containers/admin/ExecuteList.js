import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Table, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import swal from 'sweetalert';

import classNames from 'classnames';
import * as ExecuteActions from './../../actions/Execute';

class ExecuteList extends Component {
    constructor(props) {
        super(props);
        this.getExecuteList = this.getExecuteList.bind(this);
        this.deleteExecute = this.deleteExecute.bind(this);
        this.getExecuteList();
    }

    getExecuteList() {
        var data = {
            token: this.props.login.account.token,
        };
        this.props.dispatch(ExecuteActions.getExecuteList());
    }

    openNewExecute() {
        this.props.dispatch(ExecuteActions.openNewExecute());
    }

    closeNewExecute() {
        this.props.dispatch(ExecuteActions.closeNewExecute());
    }

    deleteExecute(id) {
        swal({
            title: `Delete Execute #${id}?`,
            text: `Do you readly want to DELETE Execute #${id}?`,
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
        }, () => {
            var data = new FormData();
            data.append('token', this.props.login.account.token);
            data.append('id', id);
            this.props.dispatch(ExecuteActions.deleteExecute(data));
        });
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.execute.newExecuteShow}
                >
                
                </Modal>
                <Row>
                    <Button>New Execute</Button> 
                </Row>
                <Row>
                    <Table responsive striped hover >
                        <thead>
                            <tr>
                                <td>Description</td>
                                <td>Updated at</td>
                                <td>View</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.execute.executeList.map((row) => (
                                    <tr>
                                        <td>{ row.description }</td>
                                        <td>{ row.updated_at  }</td>
                                        <td>
                                            <Button bsSize="xs" >
                                                View
                                            </Button>
                                        </td>
                                        <td>
                                            <Button bsSize="xs" bsStyle="danger"
                                                onClick={() => this.deleteExecute(row.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                    ))
                            }
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        execute: state.execute,
    };
}

export default connect(mapStateToProps)(ExecuteList);
