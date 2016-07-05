import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import classNames from 'classnames';
import { 
    Form,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as UserActions from './../../actions/User';
const mapTypeName = ['Admin', 'Test', 'Unofficial', 'Official'];

class User extends Component {
    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.putUser = this.putUser.bind(this);
        this.getUser();
    }

    getUser() {
        var data = {
            token: this.props.user.account.token,
            id: this.props.params.id,
        };
        this.props.dispatch(UserActions.getUser(data));
    }

    putUser() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(UserActions.putUser(data));
    }

    render() {
        return (
            <div key={this.props.user.user.id}>
                <h2>
                    User #{this.props.user.user.id}
                    <LinkContainer to="/admin/users/" style={{float: 'right'}}>
                        <Button>Back to List</Button>
                    </LinkContainer>
                </h2>
                <Form ref="form">
                    <input type="hidden" name="id" value={this.props.params.id} />
                    <input type="hidden" name="token" value={this.props.user.account.token} />
                    <FormGroup>
                        <ControlLabel>Account</ControlLabel>
                        <input 
                            name="account" 
                            className="form-control"
                            defaultValue={this.props.user.user.account}
                        />
                    </FormGroup> 
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <input 
                            name="name" 
                            className="form-control"
                            defaultValue={this.props.user.user.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Type</ControlLabel>
                        <select
                            name="type"
                            className="form-control"
                            defaultValue={this.props.user.user.type}
                        >
                            {
                                mapTypeName.map((row, idx) => (
                                    <option value={idx}>{row}</option>
                                ))
                            }
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>New Password</ControlLabel>
                        <input 
                            name="password" 
                            className="form-control"
                        />
                    </FormGroup>
                </Form>
                <Button
                    bsStyle="success"
                    onClick={this.putUser}
                >Submit</Button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(User);

