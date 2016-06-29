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
import * as TestdataActions from './../../actions/Testdata';

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
        this.postTestdata = this.postTestdata.bind(this);
        this.putTestdata = this.putTestdata.bind(this);
        this.deleteTestdata = this.deleteTestdata.bind(this);
        this.getExecuteList();
        this.getProblem();
        this.getTestdataList();
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

    getTestdataList() {
        var data = {
            problem_id: this.props.params.id,
            token: this.props.login.account.token,
        };
        this.props.dispatch(TestdataActions.getTestdataList(data));
    }

    postTestdata() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.newTestdata));
        this.props.dispatch(TestdataActions.postTestdata(data));
    }

    putTestdata(id) {
        var data = new FormData(ReactDOM.findDOMNode(this.refs[`testdata_${id}`]));
        this.props.dispatch(TestdataActions.disableSubmit(Promise.resolve()))
            .then(() => {
                this.props.dispatch(TestdataActions.putTestdata(data))
                    .then(() => {
                        this.props.dispatch(TestdataActions.activeSubmit());
                    });
            });
        //this.props.dispatch(TestdataActions.putTestdata(data));
    }

    deleteTestdata(id) {
        var data = new FormData();
        data.append('token', this.props.login.account.token);
        data.append('id', id);
        data.append('problem_id', this.props.params.id);
        console.log('d', id);
        this.props.dispatch(TestdataActions.deleteTestdata(data));
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
                    <Row>
                        <h3>Testdata</h3>                
                        <Form style={{display: 'none'}} ref="newTestdata">
                            <input name="token" value={this.props.login.account.token}/>
                            <input name="problem_id" value={this.props.problem.problem.id}/>
                            <input name="score" value="0" />
                            <input name="time_limit" value="1000" />
                            <input name="memory_limit" value="262144" />
                            <input name="output_limit" value="64" />
                        </Form>
                        <Button bsStyle="success" onClick={this.postTestdata}>New Testdata</Button>
                        <Table responsive striped hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th colSpan={2}>Input</th>
                                    <th colSpan={2}>Output</th>
                                    <th>Time(ms)</th>
                                    <th>Memory(KB)</th>
                                    <th>Output(KB)</th>
                                    <th>Score</th>
                                    <th colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.testdata.testdataList.map((row, idx) => (
                                        <tr key={row.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <Button
                                                    bsSize="sm"
                                                    ref={`input_${row.id}_btn`} 
                                                    onClick={() => 
                                                        ReactDOM.findDOMNode(this.refs[`input_${row.id}`]).click()
                                                    }
                                                >
                                                    上傳
                                                </Button>
                                            </td>
                                            <td>
                                                <Button bsSize="sm">下載</Button>
                                            </td>
                                            <td>
                                                <Button
                                                    bsSize="sm"
                                                    ref={`output_${row.id}_btn`} 
                                                    onClick={() => 
                                                        ReactDOM.findDOMNode(this.refs[`output_${row.id}`]).click()
                                                    }
                                                >
                                                    上傳
                                                </Button>
                                            </td>
                                            <td>
                                                <Button bsSize="sm">下載</Button>
                                            </td>
                                            <td>
                                                <input 
                                                    defaultValue={row.time_limit} 
                                                    className="form-control" 
                                                    onChange={(e) => (ReactDOM.findDOMNode(this.refs[`time_limit_${row.id}`]).value = e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    defaultValue={row.memory_limit} 
                                                    className="form-control" 
                                                    onChange={(e) => (ReactDOM.findDOMNode(this.refs[`memory_limit_${row.id}`]).value = e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    defaultValue={row.output_limit} 
                                                    className="form-control" 
                                                    onChange={(e) => (ReactDOM.findDOMNode(this.refs[`output_limit_${row.id}`]).value = e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    defaultValue={row.score} 
                                                    className="form-control" 
                                                    onChange={(e) => (ReactDOM.findDOMNode(this.refs[`score_${row.id}`]).value = e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Button 
                                                    bsStyle="success" 
                                                    disabled={!this.props.testdata.activeSubmit}
                                                    onClick={() => this.putTestdata(row.id)}
                                                >
                                                    Submit
                                                </Button>
                                                <form style={{display: 'none'}} ref={`testdata_${row.id}`}>
                                                    <input name="id" value={row.id} />
                                                    <input name="problem_id" value={this.props.params.id} />
                                                    <input name="token" value={this.props.login.account.token} />
                                                    <input 
                                                        ref={`input_${row.id}`} 
                                                        name="input" 
                                                        type="file" 
                                                        onChange={(e) => (ReactDOM.findDOMNode(this.refs[`input_${row.id}_btn`]).innerHTML = e.target.value)}
                                                    /> 
                                                    <input 
                                                        ref={`output_${row.id}`}
                                                        name="output" 
                                                        type="file" 
                                                        onChange={(e) => (ReactDOM.findDOMNode(this.refs[`output_${row.id}_btn`]).innerHTML = e.target.value)}
                                                    /> 
                                                    <input 
                                                        ref={`time_limit_${row.id}`} 
                                                        name="time_limit"  
                                                        defaultValue={row.time_limit}
                                                    />
                                                    <input 
                                                        ref={`memory_limit_${row.id}`}
                                                        name="memory_limit" 
                                                        defaultValue={row.memory_limit}
                                                    />
                                                    <input 
                                                        ref={`output_limit_${row.id}`}
                                                        name="output_limit" 
                                                        defaultValue={row.output_limit}
                                                    />
                                                    <input
                                                        ref={`score_${row.id}`}
                                                        name="score" 
                                                        defaultValue={row.score}
                                                    />
                                                </form>
                                            </td>
                                            <td>
                                                <Button 
                                                    bsStyle="danger"
                                                    onClick={() => this.deleteTestdata(row.id)} 
                                                    disabled={!this.props.testdata.activeSubmit}>Delete</Button>
                                            </td>
                                        </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
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
        testdata: state.testdata,
    };
}

export default connect(mapStateToProps)(Problem);
