import React, { Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import LoginForm from '../components/LoginForm';
import SubmitForm from './SubmitForm';
import Footer from './../components/Footer';
import Header from './Header';
import classNames from 'classnames';
import * as UserActions from '../actions/User';
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
        this.login = this.login.bind(this);
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

    login() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.userForm.refs.form));
        this.props.dispatch(UserActions.login(data));
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
        document.title = this.props.contest.contest.title;
        return (
            this.props.user.checkAccountStatus ? <div style={{height: '100%'}}>
                <div className='body'>
                    <Header />
                        <LoginForm 
                            ref="userForm"
                            show={this.props.user.loginFormShow} 
                            onHide={this.closeLoginForm}
                            login={this.login}
                        />
                        <div className='margin-bottom'>
                        { this.props.children }
                        </div>
                    </div>
                    <Footer />
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
