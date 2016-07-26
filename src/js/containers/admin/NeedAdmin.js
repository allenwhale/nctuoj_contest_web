import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

class NeedAdmin extends Component {
    constructor(props) {
        super(props);
        this.checkIsAdmin = this.checkIsAdmin.bind(this);
        this.checkIsAdmin();
    }

    checkIsAdmin() {
        if(!this.props.user.account.isADMIN) {
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

export default connect(mapStateToProps)(NeedAdmin);
