import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import Codemirror from 'codemirror';

import { Panel, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

import classNames from 'classnames';

const map_lang_mode = {
    'C': 'text/x-csrc',
    'C++': 'text/x-c++src',
    'Python': 'text/x-python',
};

class Submission extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const options = {
            lineNumbers: true,
            matchBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            autofocus: true,
            mode: '',
        };
        this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <h2 className={classNames('text-center')}>
                            Submission #{this.props.params.id}
                        </h2>
                    </Col>
                </Row>
                <Panel header={ 
                    <Row> 
                        <Col xs={2}>Problem</Col> 
                        <Col xs={2}>Submitter</Col>
                        <Col xs={2}>Time(ms)</Col>
                        <Col xs={2}>Memory(KiB)</Col>
                        <Col xs={2}>Verdict</Col>
                        <Col xs={2}>Score</Col> 
                    </Row> }
                >
                    <Row>
                        <Col xs={2}>Problem</Col> 
                        <Col xs={2}>Submitter</Col> 
                        <Col xs={2}>Time(ms)</Col> 
                        <Col xs={2}>Memory(KiB)</Col> 
                        <Col xs={2}>Verdict</Col> 
                        <Col xs={2}>Score</Col> 
                    </Row> 
                </Panel>
                { this.props.login.account.isADMIN ? 
                    <Panel header={
                        <Row>
                            <Col xs={3}>Compiler</Col>
                            <Col xs={3}>Execute Type</Col>
                            <Col xs={3}>Code Length</Col>
                            <Col xs={3}>IP</Col>
                        </Row>}
                    >
                        <Row>
                            <Col xs={3}>Compiler</Col>
                            <Col xs={3}>Execute Type</Col>
                            <Col xs={3}>Code Length</Col>
                            <Col xs={3}>IP</Col>
                        </Row>
                    </Panel> :
                        <Panel header={
                            <Row>
                                <Col xs={4}>Compiler</Col>
                                <Col xs={4}>Execute Type</Col>
                                <Col xs={4}>Code Length</Col>
                            </Row>}
                        >
                            <Row>
                                <Col xs={4}>Compiler</Col>
                                <Col xs={4}>Execute Type</Col>
                                <Col xs={4}>Code Length</Col>
                            </Row>
                        </Panel>
                        } 
                <Table responsive striped hover >
                    <thead>
                        <tr>
                            <th>#</th> 
                            <th>Time</th> 
                            <th>Memory</th> 
                            <th>Verdict</th> 
                            <th>Score</th> 
                        </tr> 
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                <textarea ref="code" value=""></textarea>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        submission: state.submission,
    };
}

export default connect(mapStateToProps)(Submission);
