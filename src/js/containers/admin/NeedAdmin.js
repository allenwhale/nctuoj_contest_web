import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

class Master extends Component {
    constructor(props) {
        super(props);
        this.checkIsLogin = this.checkIsLogin.bind(this);
        this.checkIsLogin();
    }

    checkIsLogin() {
        if(!this.props.login.account.isADMIN) {
            console.log('not admin');
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
    };
}

export default connect(mapStateToProps)(Master);
