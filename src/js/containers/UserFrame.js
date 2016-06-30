import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { 
    Grid, 
    Row, 
    Col 
} from 'react-bootstrap';
import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';
import ContestLeftNav from './../components/ContestLeftNav';

import classNames from 'classnames';


class UserFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={2}>
                            { this.props.user.account.isLOGIN ?
                            <ContestLeftNav 
                                isADMIN={this.props.user.account.isADMIN}
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
        user: state.user,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(UserFrame);
