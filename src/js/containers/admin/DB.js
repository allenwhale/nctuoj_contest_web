import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { 
    Button
} from 'react-bootstrap'
import classNames from 'classnames';
import * as DBActions from './../../actions/DB';
import swal from 'sweetalert';

class DB extends Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear(name){
        swal({
            title: `清空所有 ${name}`,
            text: `您確定要將所有 ${name} 都刪除?`,
            type: 'warning',
            showCancelButton: true,
            closeOnConfirm: true,
        }, () => {
            this.props.dispatch(DBActions.deleteTable({
                token: this.props.user.account.token,
                name: name,
            })).then(() => {
                window.location = window.location;
            });
        });
    }

    render() {
        return (
            <div>
                <Button
                    onClick={()=>{
                        this.clear('problems');
                    }}>Clear Problems</Button>
                <Button
                    onClick={()=>{
                        this.clear('submissions');
                    }}
                    >Clear Submissions</Button>
                <Button
                    onClick={()=>{
                        this.clear('clarifications');
                    }}
                    >Clear Clarifications</Button>
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

export default connect(mapStateToProps)(DB);
