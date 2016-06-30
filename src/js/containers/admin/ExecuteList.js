import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { 
    Table, 
    Button,
    Modal,
    Row,
    Form
} from 'react-bootstrap';
import swal from 'sweetalert';
import AdminExecuteForm from '../../containers/admin/ExecuteForm';

import classNames from 'classnames';
import * as ExecuteActions from './../../actions/Execute';

class ExecuteList extends Component {
    constructor(props) {
        super(props);
        this.deleteExecute = this.deleteExecute.bind(this);
        this.postExecute = this.postExecute.bind(this);
        this.openNewExecute = this.openNewExecute.bind(this);
        this.closeNewExecute = this.closeNewExecute.bind(this);
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
            data.append('token', this.props.user.account.token);
            data.append('id', id);
            this.props.dispatch(ExecuteActions.deleteExecute(data));
        });
    }

    postExecute() {
        var form = this.refs.executeForm.getWrappedInstance();
        var data = new FormData(ReactDom.findDOMNode(form.refs.form));
        console.log(data.get('token'), data.get('description'));
        this.props.dispatch(ExecuteActions.postExecute(data));
    }


    render() {
        return (
            <div>
                <Modal
                    show={this.props.execute.newExecuteShow}
                    onHide={this.closeNewExecute}
                >
                    <Modal.Header>
                        <Modal.Title>
                            New Execute
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminExecuteForm
                            ref="executeForm"
                            newExecute={true}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="warning" onClick={this.closeNewExecute}>Close</Button>
                        <Button bsStyle="success" onClick={this.postExecute}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Button onClick={this.openNewExecute}>New Execute</Button> 
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
                                this.props.execute.executeList.mapArr((row) => (
                                    <tr key={row.id}>
                                        <td>{ row.description }</td>
                                        <td>{ row.updated_at  }</td>
                                        <td>
                                            <Button bsSize="xs" >
                                                <Link to={`/admin/executes/${row.id}/`}>View</Link>
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
        user: state.user,
        execute: state.execute,
    };
}

export default connect(mapStateToProps, null, null, {withRef: true})(ExecuteList);
