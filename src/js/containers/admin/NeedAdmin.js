import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

class NeedAdmin extends Component {
    constructor(props) {
        super(props);
        this.checkIsAdmin = this.checkIsAdmin.bind(this);
        this.checkIsAdmin();
    }

    checkIsAdmin() {
        console.log(this.props.login.account);
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

export default connect(mapStateToProps)(NeedAdmin);
