import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'

class NeedLogin extends Component {
    constructor(props) {
        super(props);
        this.checkIsLogin = this.checkIsLogin.bind(this);
        this.checkIsLogin();
    }

    checkIsLogin() {
        if(!this.props.login.account.isLOGIN) {
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

export default connect(mapStateToProps)(NeedLogin);
