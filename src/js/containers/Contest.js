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
        this.getProblemList = this.getProblemList.bind(this);
        this.getProblemList();
    }

    getProblemList() {
        this.props.dispatch(Problem.getProblemList());
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={2}> 
                            <ContestLeftNav 
                                problemList={this.props.problem.problemList}
                                activeKey={0}
                            />
                        </Col>
                        <Col md={10}>
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
                            <Row>
                                <Col md={12}>
                                    <Panel header="Problems">
                                        <ListGroup fill>
                                            <ListGroupItem>Problem 1</ListGroupItem> 
                                            <ListGroupItem>Problem 2</ListGroupItem> 
                                            <ListGroupItem>Problem 3</ListGroupItem> 
                                            <ListGroupItem>Problem 4</ListGroupItem> 
                                        </ListGroup> 
                                    </Panel>
                                </Col> 
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(Contest);
