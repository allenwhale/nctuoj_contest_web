import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'

class NeedUser extends Component {
    constructor(props) {
        super(props);
        this.checkIsLogin = this.checkIsLogin.bind(this);
        this.checkIsLogin();
    }

    checkIsLogin() {
        if(!this.props.user.account.isLOGIN) {
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
        user: state.user,
    };
}

export default connect(mapStateToProps)(NeedUser);
