import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import FormData from 'form-data';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import AdminNewProblemForm from './../../components/admin/NewProblemForm';

import classNames from 'classnames';
import * as ProblemActions from './../../actions/Problem';
import * as Config from './../../utils/Config';

function getFormValue(args, form) {
    var data = {};
    for(var i in args){
        data[args[i]] = ReactDOM.findDOMNode(form.refs[args[i]]).value;
    }
    return data;
}

class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.getProblemList = this.getProblemList.bind(this);
        this.postProblem = this.postProblem.bind(this);
        this.closeNewProblemForm = this.closeNewProblemForm.bind(this);
        this.openNewProblemForm = this.openNewProblemForm.bind(this);
        this.closeProblemErrMsg = this.closeProblemErrMsg.bind(this);
        this.getProblemList();
    }

    closeProblemErrMsg() {
        this.props.dispatch(ProblemActions.closeProblemErrMsg());
    }

    closeNewProblemForm() {
        this.props.dispatch(ProblemActions.closeNewProblemForm());
    }

    openNewProblemForm() {
        this.props.dispatch(ProblemActions.openNewProblemForm());
    }

    getProblemList() {
        var data = {
            token: this.props.login.account.token,
        }
        this.props.dispatch(ProblemActions.getProblemList(data));
    }

    postProblem() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.newProblem.refs.form));
        this.props.dispatch(ProblemActions.postProblem(data));
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Button onClick={this.openNewProblemForm}>New Problem</Button>
                            <ListGroup>
                                {
                                    this.props.problem.problemList.map((row) => (
                                        <ListGroupItem>
                                            <Link to={`/admin/problems/${row.id}/`}>
                                                {row.title}
                                            </Link>
                                        </ListGroupItem> 
                                    ))
                                }
                            </ListGroup>
                        </Col> 
                    </Row> 
                </Grid>
                <AdminNewProblemForm 
                    ref="newProblem"
                    token={this.props.login.account.token}
                    show={this.props.problem.newProblemFormShow}
                    onHide={this.closeNewProblemForm}
                    submit={this.postProblem}
                    errMsg={this.props.problem.errMsg}
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

export default connect(mapStateToProps)(ProblemList);
