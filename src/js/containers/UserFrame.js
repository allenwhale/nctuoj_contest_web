import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import { Grid, Row, Col } from 'react-bootstrap';
import * as Problem from './../actions/Problem';
import ContestLeftNav from './../components/ContestLeftNav';

import classNames from 'classnames';


class UserFrame extends Component {
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
                            />
                        </Col> 
                        <Col md={10}>
                            { this.props.children }
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

export default connect(mapStateToProps)(UserFrame);
