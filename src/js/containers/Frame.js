import React, { PropTypes, Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

import * as BaseActions from '../actions/base';
import * as LoginActions from '../actions/Login';

function getFormValue(args, form) {
    var data = {};
    for(var i in args){
        data[args[i]] = ReactDOM.findDOMNode(form.refs[args[i]]).value;
    }
    return data;
}


class Frame extends Component {
    constructor(props) {
        super(props);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.openLoginForm = this.openLoginForm.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.checkAccount = this.checkAccount.bind(this);
        this.checkAccount();
    }

    closeLoginForm() {
        this.props.dispatch(LoginActions.closeLoginForm());
    }

    openLoginForm() {
        this.props.dispatch(LoginActions.openLoginForm());
    }

    signIn() {
        var args = ['account', 'password'];
        var data = getFormValue(args, this.refs.loginForm);
        this.props.dispatch(LoginActions.signIn(data));
    }

    signOut() {
        this.props.dispatch(LoginActions.signOut());
    }

    checkAccount() {
        this.props.dispatch(LoginActions.checkAccount());
    }

    render() {
        return (
            <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Contest</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {
                            this.props.login.account.name ? 
                                [<NavItem>Hi { this.props.login.account.name }</NavItem>,
                                <NavItem onClick={this.signOut}>Logout</NavItem>] : 
                                <NavItem onClick={this.openLoginForm}>Login</NavItem>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <LoginForm 
                ref="loginForm"
                loginErr={this.props.login.loginErr}
                show={this.props.login.loginFormShow} 
                onHide={this.closeLoginForm}
                signIn={this.signIn}
            />
            { this.props.children }
            { process.env.NODE_ENV !== 'production' ?  <DevTools /> : <div></div> }
        </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
    };
}


export default connect(mapStateToProps)(Frame);
