import React, { Component } from 'react';
import DevTools from './DevTools';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import SubmitForm from './SubmitForm';
import Footer from './../components/Footer';
import Header from './Header';
import * as UserActions from '../actions/User';
require('sweetalert/dist/sweetalert.css');
require('codemirror/lib/codemirror.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('./../../assets/styles/core.sass');


class Frame extends Component {
    constructor(props) {
        super(props);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.login = this.login.bind(this);
        this.getUserMe = this.getUserMe.bind(this);
        this.getUserMe();
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
            this.props.user.checkAccountStatus ? 
                <div style={{height: '100%'}}>
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
