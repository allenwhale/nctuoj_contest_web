import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import * as ProblemActions from './../../actions/Problem';

import classNames from 'classnames';

function getFormValue(args, form) {
    var data = {};
    for(var i in args){
        data[args[i]] = ReactDOM.findDOMNode(form.refs[args[i]]).value;
    }
    return data;
}

class Problem extends Component {
    constructor(props) {
        super(props);
        this.submitBasic = this.submitBasic.bind(this);
        this.getProblem = this.getProblem.bind(this);
        this.getProblem();
    }

    getProblem() {
        var data = {
            id: this.props.params.id,
            token: this.props.login.account.token,
        }
        this.props.dispatch(ProblemActions.getProblem(data));
    }

    submitBasic() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.basic));
        this.props.dispatch(ProblemActions.putProblem(data));
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <h2>
                                Problem Title
                            </h2>
                        </Col> 
                    </Row>
                    <Row>
                        <Col md={10} mdOffset={1}>
                                            { this.props.problem.errMsg != '' ? 
                                                <Alert bsStyle="danger">
                                                    { this.props.problem.errMsg }
                                                </Alert> : null
                                            }
                            <Form ref="basic">
                                <input type="hidden" name="token" value={this.props.login.account.token} />
                                <input type="hidden" name="id" value={this.props.params.id} />
                                <h3>Basic</h3> 
                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <ControlLabel>Title</ControlLabel>
                                            <FormControl name="title" type="text" className="form-control" value="test" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <ControlLabel>Pdf</ControlLabel>
                                            <input name="pdf" className="form-control" type="file"></input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <ControlLabel>Score Type</ControlLabel>
                                            <select name="score_type" value={this.props.problem.problem.score_type} className="form-control">
                                                <option value="1">sum</option>
                                                <option value="2">min</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <ControlLabel>Verdict</ControlLabel>
                                            <FormControl ref="verdict"></FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <Button bsStyle="success" onClick={this.submitBasic}>Submit</Button>
                        </Col>
                    </Row>
                </Grid>
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
