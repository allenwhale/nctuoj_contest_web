import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { 
    Button
} from 'react-bootstrap'
import AdminExecuteForm from './ExecuteForm';
import classNames from 'classnames';
import * as ExecuteActions from './../../actions/Execute';

class Execute extends Component {
    constructor(props) {
        super(props);
        this.getExecute = this.getExecute.bind(this);
        this.putExecute = this.putExecute.bind(this);
        this.getExecute();
    }

    getExecute() {
        var data = {
            id: this.props.params.id,
            token: this.props.user.account.token,
        };
        this.props.dispatch(ExecuteActions.getExecute(data));
    }

    putExecute() {
        var form = this.refs.executeForm.getWrappedInstance();
        var data = new FormData(ReactDom.findDOMNode(form.refs.form));
        data.append('id', this.props.params.id);
        this.props.dispatch(ExecuteActions.putExecute(data));
    }

    render() {
        return (
            <div>
                <h2>Execute #{this.props.execute.execute.id}</h2>
                <AdminExecuteForm 
                    ref="executeForm"
                    newExecute={false}
                />
                <Button bsStyle="success" onClick={this.putExecute}>
                    Submit
                </Button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        execute: state.execute,
    };
}

export default connect(mapStateToProps)(Execute);
