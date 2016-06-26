import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { Grid, Row, Col } from 'react-bootstrap';
import * as ProblemActions from './../actions/Problem';
import ContestLeftNav from './../components/ContestLeftNav';

import classNames from 'classnames';


class UserFrame extends Component {
    constructor(props) {
        super(props);
        this.getProblemList = this.getProblemList.bind(this);
        this.getProblemList();
    }

    getProblemList() {
        var data = {
            token: this.props.login.account.token,
        }
        this.props.dispatch(ProblemActions.getProblemList(data));
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={2}>
                            { this.props.login.account.isLOGIN ?
                            <ContestLeftNav 
                                problemList={this.props.problem.problemList}
                            /> : "" }
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
        login: state.login,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(UserFrame);
