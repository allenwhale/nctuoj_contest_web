import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { 
    Grid, 
    Row, 
    Col ,
    Button,
    ListGroup,
    ListGroupItem,
    Panel,
    Table
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import ContestLeftNav from '../components/ContestLeftNav';
import SubmitForm from './SubmitForm';
import empty from 'is-empty';
import classNames from 'classnames';
import Config from './../utils/Config';
import * as ProblemActions from './../actions/Problem';
import * as SubmissionActions from './../actions/Submission';
import * as TestdataActions from './../actions/Testdata';

class Problem extends Component {
    constructor(props) {
        super(props);
        this.getProblem = this.getProblem.bind(this);
        this.getTestdataList = this.getTestdataList.bind(this);
        this.openSubmitForm = this.openSubmitForm.bind(this);
        this.getProblem();
        this.getTestdataList();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.problem.problem.id != nextProps.params.id)
            this.getProblem(nextProps.params.id);
    }

    getProblem(id) {
        var data = {
            id: id || this.props.params.id,
            token: this.props.user.account.token,
        }
        this.props.dispatch(ProblemActions.getProblem(data));
    }

    getTestdataList() {
        var data = {
            problem_id: this.props.params.id,
            token: this.props.user.account.token,
        };
        this.props.dispatch(TestdataActions.getTestdataList(data));
    }

    openSubmitForm() {
        this.props.dispatch(SubmissionActions.openSubmitForm());
    }

    render() {
        return (
            <div key={this.props.problem.problem.id}>
                <h1 className={classNames('text-center')}>
                    { problemTitle(this.props.problem.problem) }
                </h1>
                <Row className={classNames('margin-bottom')}>
                    <Col md={2}>
                        <Button 
                            bsClass="btn btn-default btn-sm btn-block"
                            onClick={this.openSubmitForm}
                        >Submit</Button>
                    </Col>
                    <Col md={2}>
                        <LinkContainer to={`/submissions/?problem_id=${this.props.params.id}`}>
                            <Button bsClass="btn btn-default btn-sm btn-block">Submissions</Button>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row className={classNames('margin-bottom')}>
                    <Col md={12}>
                        <iframe src={`${Config.baseUrl}/api/problems/${this.props.params.id}/pdf/?token=${this.props.user.account.token}`}
                            style={{width: '100%', height: '768px'}}
                        ></iframe>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Execute Type">
                            <ListGroup>
                                {
                                    this.props.problem.problem.executes.mapArr((row) => (
                                        <ListGroupItem key={row.id}>{row.description}</ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Testdata">
                            <Table responsive striped hover >
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
                                    {
                                        this.props.testdata.testdataList.mapArr((row, idx) => (
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>{row.time_limit}</td>
                                                <td>{row.memory_limit}</td>
                                                <td>{row.output_limit}</td>
                                                <td>{row.score}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table> 
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        problem: state.problem,
        submission: state.submission,
        testdata: state.testdata,
    };
}

export default connect(mapStateToProps)(Problem);
