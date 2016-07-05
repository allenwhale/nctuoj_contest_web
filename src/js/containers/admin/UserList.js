import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import classNames from 'classnames';
import { 
    Table, 
    Button,
    Modal,
    Form,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import swal from 'sweetalert';
import * as UserActions from './../../actions/User';
const mapTypeName = ['Admin', 'Test', 'Unofficial', 'Official'];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.openNewUserForm = this.openNewUserForm.bind(this);
        this.closeNewUserForm = this.closeNewUserForm.bind(this);
        this.postUser = this.postUser.bind(this);
        this.postUserCsv = this.postUserCsv.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    openNewUserForm() {
        this.props.dispatch(UserActions.openNewUserForm());
    }

    closeNewUserForm() {
        this.props.dispatch(UserActions.closeNewUserForm());
    }

    postUser() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(UserActions.postUser(data));
    }

    postUserCsv() {
        swal({
            title: 'Upload Users CSV',
            text: 'Uploading users by CSV file will delete all users first(except admin)!!',
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
        }, () => {
            var data = new FormData(ReactDOM.findDOMNode(this.refs.csv));
            this.props.dispatch(UserActions.postUserCsv(data));
        }); 
    }

    deleteUser(user) {
        swal({
            title: `Delete User #${user.id}`,
            text: `Do you realy want to delete User #${user.id} ${user.name} ?`,
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: false,
        }, () => {
            var data = new FormData();
            data.append('token', this.props.user.account.token);
            data.append('id', user.id);
            this.props.dispatch(UserActions.deleteUser(data));
        });
    }

    render() {
        return (
            <div>
                <Button
                    bsStyle="success"
                    onClick={this.openNewUserForm}
                >
                    New
                </Button>
                <Modal
                    show={this.props.user.newUserFormShow}
                    onHide={this.closeNewUserForm}
                >
                    <Modal.Header>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form ref="csv">
                            <input type="hidden" name="token" value={this.props.user.account.token} />
                            <FormGroup>
                                <ControlLabel>CSV File</ControlLabel>
                                <input 
                                    name="users_file"
                                    type="file"
                                    className="form-control"
                                />
                            </FormGroup>
                        </Form>
                        <hr />
                        <Form ref="form">
                            <input type="hidden" name="token" value={this.props.user.account.token} />
                            <FormGroup>
                                <ControlLabel>Account</ControlLabel>
                                <input 
                                    name="account"
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <input 
                                    name="name"
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Type</ControlLabel>
                                <select 
                                    name="type"
                                    className="form-control"
                                >
                                    {
                                        mapTypeName.map((row, idx) => (
                                            <option value={idx}>{row}</option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <input 
                                    name="password"
                                    className="form-control"
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            bsStyle="success"
                            onClick={this.postUserCsv}
                        >Upload CSV</Button>
                        <Button
                            bsStyle="success"
                            onClick={this.postUser}
                        >Submit</Button>
                        <Button
                            bsStyle="warning"
                            onClick={this.closeNewUserForm}
                        >Close</Button>
                    </Modal.Footer>
                </Modal>
                <Table responsive striped hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Account</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.user.userList.mapArr((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.account}</td>
                                    <td>{row.name}</td>
                                    <td>{mapTypeName[row.type]}</td>
                                    <td>
                                        <LinkContainer to={`/admin/users/${row.id}/`}>
                                            <Button bsSize="xs" >View</Button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        <Button
                                            bsSize="xs"
                                            bsStyle="danger"
                                            onClick={() => this.deleteUser(row)}
                                        >Delete</Button>
                                    </td>
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
    };
}

export default connect(mapStateToProps)(UserList);


