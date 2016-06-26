import React, { PropTypes, Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import classNames from 'classnames';

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
            <Navbar style={{margin: 0}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Contest</Link>
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
            <footer {...this.props} 
                className={classNames(this.props.className, 'footer', 'text-center')}
                style={{"background-color": "#E7E7E7"}}
            >
				<Grid fluid={true}>
                    <Row>
                        <Col md={3} mdOffset={2}>
							<h3>Developer</h3>
							<p>ChunKai, Chen @ <a href="http://fogworkshop.com/" target="_blank">fogworkshop</a></p>
							<p>Ho-Lun, Wu @ <a href="http://fogworkshop.com/" target="_blank">fogworkshop</a></p>
						</Col>
						<Col md={2}>
							<h3>Contact us</h3>
							<p><a href="mailto:wingemerald@gmail.com">wingemerald@gmail.com</a></p>
							<p><a href="mailto:allencat850502@gmail.com">allencat850502@gmail.com</a></p>
						</Col>
						<Col md={3}>
							<h3>Others</h3>
                            <p><Link to="/special/">Special Thanks</Link></p>
							<p>Developer Diary</p>
							<p>Privacy Policy</p>
						</Col>
					</Row>
                    <Row>
                        <Col md={12} className={classNames(this.props.className, 'text-center')}>
                            Copyright @ 2015-2016. All rights reserved.
                        </Col>
                    </Row>
				</Grid>
			</footer>
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
