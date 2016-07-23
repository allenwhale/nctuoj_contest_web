import React, { Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { 
    Navbar, 
    Nav, 
    NavItem, 
    MenuItem, 
    NavDropdown,
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SubmitForm from './SubmitForm';
import classNames from 'classnames';
import * as UserActions from '../actions/User';
import * as SubmissionActions from './../actions/Submission';
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
        this.openSubmitForm = this.openSubmitForm.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserMe = this.getUserMe.bind(this);
        this.getTime = this.getTime.bind(this);
        this.increaseTime = this.increaseTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.getUserMe();
        this.timeUpdateCount = 0;
        setInterval(this.updateTime, 1000);
    }

    updateTime() {
        if(this.timeUpdateCount == 0) {
            this.getTime();
        } else {
            this.increaseTime();
        }
        this.timeUpdateCount = (this.timeUpdateCount + 1) % UPDATE_INTERVAL;
    }

    getTime() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(SystemActions.getTime(data));
    }

    increaseTime() {
        var time = this.props.system.time;
        time.setSeconds(time.getSeconds() + 1);
        this.setState({
            system: {
                ...this.props.system,
                time,
            },
        });
    }

    closeLoginForm() {
        this.props.dispatch(UserActions.closeLoginForm());
    }

    openLoginForm() {
        this.props.dispatch(UserActions.openLoginForm());
    }

    openSubmitForm() {
        this.props.dispatch(SubmissionActions.openSubmitForm(true));
    }

    login() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.userForm.refs.form));
        this.props.dispatch(UserActions.login(data));
    }

    logout() {
        this.props.dispatch(UserActions.logout());
    }

    getUserMe() {
        var account = localStorage.getItem('account');
        if(account) {
            try {
                account = JSON.parse(account);
            } catch(e) {
                account = {};
            }
        } else {
            account = {};
        }
        var data = {
            token: account.token,
        };
        this.props.dispatch(UserActions.getUserMe(data));
    }

    render() {
        const remainMinutes = Math.floor((new Date(this.props.contest.contest.end) - this.props.system.time) / 1000 / 60);
        document.title = this.props.contest.contest.title;
        return (
            this.props.user.checkAccountStatus ? <div style={{height: '100%'}}>
                <div className={classNames('body')}>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Contest</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            { this.props.user.account.isLOGIN ?
                                <Nav>
                                    <LinkContainer to="/submissions/">
                                        <NavItem>Submissions</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/clarifications/">
                                        <NavItem>Clarifications</NavItem>
                                    </LinkContainer>
                                    <NavItem onClick={this.openSubmitForm}>
                                        Quick Submit
                                    </NavItem>
                                    <LinkContainer to="/scoreboard/">
                                        <NavItem>Scoreboard</NavItem>
                                    </LinkContainer>
                                    { this.props.user.account.isADMIN ? 
                                        <LinkContainer to="/admin/">
                                            <NavItem>Admin</NavItem>
                                        </LinkContainer> : ""
                                    }
                            </Nav> : <Nav> <LinkContainer to="/scoreboard/"><NavItem>Scoreboard</NavItem></LinkContainer> </Nav>
                            }
                            <Nav pullRight>
                                <NavItem>
                                    { Math.floor(remainMinutes / 60) } hr { remainMinutes % 60 } min
                                </NavItem>
                                {
                                    this.props.user.account.isLOGIN ?  [
                                        <LinkContainer to="/user/"> 
                                            <NavItem key="0">
                                                Hi { this.props.user.account.name }
                                            </NavItem> 
                                        </LinkContainer>, 
                                        <NavItem key="1" onClick={this.logout}>Logout</NavItem>
                                        ] : <NavItem key="2" onClick={this.openLoginForm}>Login</NavItem>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <LoginForm 
                            ref="userForm"
                            show={this.props.user.loginFormShow} 
                            onHide={this.closeLoginForm}
                            login={this.login}
                        />
                        <div className={classNames('margin-bottom')}>
                        { this.props.children }
                        </div>
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
                    <SubmitForm />
                    { process.env.NODE_ENV !== 'production' ?  <DevTools /> : <div></div> }
                </div> : <div></div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        system: state.system,
        contest: state.contest,
    };
}

export default connect(mapStateToProps)(Frame);
