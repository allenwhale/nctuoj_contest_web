import React, { Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import classNames from 'classnames';

import * as LoginActions from '../actions/Login';
import * as SystemActions from '../actions/System';
require('sweetalert/dist/sweetalert.css');
require('codemirror/lib/codemirror.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('./../../assets/styles/core.sass');

const UPDATE_INTERVAL = 60;

class Frame extends Component {
    constructor(props) {
        super(props);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.openLoginForm = this.openLoginForm.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.checkAccount = this.checkAccount.bind(this);
        this.getTime = this.getTime.bind(this);
        this.increaseTime = this.increaseTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.checkAccount();
        this.timeUpdateCount = 0;
        setInterval(this.updateTime, 1000);
    }

    updateTime() {
        if(this.timeUpdateCount == 0) {
            this.getTime();
            this.timeUpdateCount = (this.timeUpdateCount + 1) % UPDATE_INTERVAL;
        } else {
            this.increaseTime();
            this.timeUpdateCount = (this.timeUpdateCount + 1) % UPDATE_INTERVAL;
        }
    }

    getTime() {
        var data = {
            token: this.props.login.account.token,
        };
        this.props.dispatch(SystemActions.getTime(data));
    }

    increaseTime() {
        var time = this.props.system.time;
        time.setSeconds(time.getSeconds() + 1);
        this.setState({
            time
        });
        //this.props.dispatch(SystemActions.increaseTime());
    }

    closeLoginForm() {
        this.props.dispatch(LoginActions.closeLoginForm());
    }

    openLoginForm() {
        this.props.dispatch(LoginActions.openLoginForm());
    }

    signIn() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.loginForm.refs.form));
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
            <div style={{height: '100%'}}>
                <div className={classNames('body')}>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Contest</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem>
                                    {this.props.system.time.toLocaleString()}
                                </NavItem>
                                {
                                    this.props.login.account.name ? 
                                        [<NavItem key="0">Hi { this.props.login.account.name }</NavItem>,
                                            <NavItem key="1" onClick={this.signOut}>Logout</NavItem>] : 
                                    <NavItem key="2" onClick={this.openLoginForm}>Login</NavItem>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <LoginForm 
                            ref="loginForm"
                            show={this.props.login.loginFormShow} 
                            onHide={this.closeLoginForm}
                            signIn={this.signIn}
                        />
                        { this.props.children }
                    </div>
                    <footer {...this.props} 
                        className={classNames(this.props.className, 'footer', 'text-center')}
                        style={{backgroundColor: "#E7E7E7"}}
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
        system: state.system,
    };
}

export default connect(mapStateToProps)(Frame);
