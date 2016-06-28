import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ContestLeftNav from './../components/ContestLeftNav';
import classNames from 'classnames';

import * as Problem from './../actions/Problem';

class Contest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12} className={classNames('text-center')}>
                        <h3>Contest Name</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Panel header="Start">start time</Panel>
                    </Col>
                    <Col md={4}>
                        <Panel header="End">end time</Panel>
                    </Col>
                    <Col md={4}>
                        <Panel header="Freeze">freeze time</Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Description">
                            DESCRIPTION CONTENT
                        </Panel>
                    </Col> 
                </Row>
                { this.props.login.account.isLOGIN ? 
                <Row>
                    <Col md={12}>
                        <Panel header="Problems">
                            <ListGroup fill>
                                {
                                    this.props.problem.problemList.map((row) => (
                                        <ListGroupItem key={row.id}>{row.title}</ListGroupItem> 
                                    ))
                                }
                            </ListGroup> 
                        </Panel>
                    </Col> 
                </Row> : null }
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

export default connect(mapStateToProps)(Contest);
