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
        if(!this.props.login.account.isLOGIN) {
            console.log('not login');
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
