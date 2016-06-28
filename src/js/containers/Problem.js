import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Panel, Table } from 'react-bootstrap';
import ContestLeftNav from '../components/ContestLeftNav';
import SubmitForm from '../components/SubmitForm';
import empty from 'is-empty';

import classNames from 'classnames';
import * as ProblemActions from './../actions/Problem';

class Problem extends Component {
    constructor(props) {
        super(props);
        this.getProblem = this.getProblem.bind(this);
        this.submit = this.submit.bind(this);
        this.openSubmitForm = this.openSubmitForm.bind(this);
        this.closeSubmitForm = this.closeSubmitForm.bind(this);
        this.getProblem();
        this.retry = true;
    }

    getProblem() {
        var data = {
            id: this.props.params.id,
            token: this.props.login.account.token,
        }
        console.log(data);
        this.props.dispatch(ProblemActions.getProblem(data));
    }

    submit() {
        console.log('submit', this.refs);
        var args = ['execute_type', 'code'];
        var data = getFormValue(args, this.refs.submitForm);
        data.id = this.props.params.id;
        console.log(data);
    }

    closeSubmitForm() {
        this.props.dispatch(ProblemActions.closeSubmitForm());
    }

    openSubmitForm() {
        this.props.dispatch(ProblemActions.openSubmitForm());
    }

    render() {
        if( this.retry && this.props.problem.problem.id != this.props.params.id) {
            this.getProblem();
            this.retry = false;
        } else {
            this.retry = true;
        }
        return (
            <div key={this.props.problem.problem.id}>
                <h1 className={classNames('text-center')}>
                    { this.props.problem.problem.title }
                </h1>
                <Row>
                    <Col md={2}>
                        <Button 
                            bsClass="btn btn-default btn-sm btn-block"
                            onClick={this.openSubmitForm}
                        >Submit</Button>
                    </Col>
                    <Col md={2}>
                        <Button bsClass="btn btn-default btn-sm btn-block">Submissions</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <iframe src={`http://140.113.89.233:9000/${this.props.params.id}.pdf`}
                            style={{width: '100%', height: '768px'}}
                        ></iframe>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Execute Type">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Lang</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>C</td>
                                        <td>Basic C</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Testdata">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Time Limit</th>
                                        <th>Memory Limit</th>
                                        <th>Output Limit</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1000</td>
                                        <td>1000</td>
                                        <td>1000</td>
                                        <td>100</td>
                                    </tr>
                                </tbody>
                            </Table> 
                        </Panel>
                    </Col>
                </Row>
                <SubmitForm 
                    ref="submitForm" 
                    show={this.props.problem.submitFormShow} 
                    onHide={this.closeSubmitForm}
                    onSubmit={this.submit}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(Problem);
