import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Grid, Row, Col, Button, Table } from 'react-bootstrap';
import { Panel, DropdownButton, MenuItem } from 'react-bootstrap';
import empty from 'is-empty';
import * as ProblemActions from './../../actions/Problem';
import * as ExecuteActions from './../../actions/Execute';

import classNames from 'classnames';

class Problem extends Component {
    constructor(props) {
        super(props);
        this.putProblem = this.putProblem.bind(this);
        this.getProblem = this.getProblem.bind(this);
        this.putProblemExecute = this.putProblemExecute.bind(this);
        this.getExecuteList = this.getExecuteList.bind(this);
        this.addProblemExecute = this.addProblemExecute.bind(this);
        this.deleteProblemExecute = this.deleteProblemExecute.bind(this);
        this.getExecuteList();
        this.getProblem();
    }

    addProblemExecute(execute) {
        this.props.dispatch(ProblemActions.addProblemExecute(execute));
    }

    deleteProblemExecute(execute) {
        this.props.dispatch(ProblemActions.deleteProblemExecute(execute));
    }

    getExecuteList() {
        this.props.dispatch(ExecuteActions.getExecuteList());
    }

    getProblem() {
        var data = {
            id: this.props.params.id,
            token: this.props.login.account.token,
        }
        this.props.dispatch(ProblemActions.getProblem(data));
    }

    putProblem() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.basic));
        this.props.dispatch(ProblemActions.putProblem(data));
    }

    putProblemExecute() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.execute));
        this.props.dispatch(ProblemActions.putProblemExecute(data));
    }

    render() {
        return (
            <div key={this.props.problem.problem.id}>
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
                        <Button bsStyle="success" onClick={this.putProblem}>Submit</Button>
                    </Row>
                    <Row>
                        <h3>Execute Type</h3>
                        <Panel header={
                            <div>
                                <span>新增</span>
                                <DropdownButton title="Execute List" id="dropdown">
                                    {
                                        this.props.execute.executeList.map((row) => (
                                            <MenuItem 
                                                key={row.id} 
                                                eventKey={row.id}
                                                onClick={() => this.addProblemExecute(row)}
                                            >
                                                {row.description}
                                            </MenuItem>
                                        ))
                                    }
                                </DropdownButton>
                            </div>}
                        >
                            <Form ref="execute">
                                <input type="hidden" name="id" value={this.props.params.id} />
                                <input type="hidden" name="token" value={this.props.login.account.token} />
                                <Table responsive striped hover >
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.problem.problem.executes.map((row) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        {row.description}
                                                        <input 
                                                            type="hidden" 
                                                            name="executes[]" 
                                                            value={row.id}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button 
                                                            bsSize="sm"
                                                            bsStyle="danger"
                                                            onClick={() => this.deleteProblemExecute(row)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Form>
                        </Panel>
                        <Button
                            bsStyle="success"
                            onClick={this.putProblemExecute}
                        >
                            Submit
                        </Button>
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
        execute: state.execute,
    };
}

export default connect(mapStateToProps)(Problem);
