import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import empty from 'is-empty';
import * as ProblemActions from './../../actions/Problem';

import classNames from 'classnames';

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
                        <h2>
                            { this.props.problem.problem.title }
                            <Link 
                                className="btn btn-default" 
                                to="/admin/problems/"
                                style={{float: 'right'}}
                            >
                                Back to List
                            </Link>
                        </h2>
                    </Row>
                    { !empty(this.props.problem.problem) ?
                    <Row>
                            <Form ref="basic">
                                <input type="hidden" name="token" value={this.props.login.account.token} />
                                <input type="hidden" name="id" value={this.props.params.id} />
                                <h3>Basic</h3> 
                                <Row>
                                    <Col md={3}>
                                        <FormGroup>
                                            <ControlLabel>Title</ControlLabel>
                                            <input name="title" type="text" className="form-control" defaultValue={this.props.problem.problem.title} />
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
                                            <select name="score_type" defaultValue={this.props.problem.problem.score_type} className="form-control">
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
                    </Row> : null }
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
