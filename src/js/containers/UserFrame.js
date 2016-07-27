import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import Config from './../utils/Config';

import { 
    Grid, 
    Row, 
    Col ,
    Nav,
    NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import * as ProblemActions from './../actions/Problem';
import * as UserActions from './../actions/User';

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
                            <Nav stacked >
                                { this.props.problem.problemListStatus ?
                                    this.props.problem.problemList.mapArr((row) => (
                                        <LinkContainer key={row.id} to={`/problems/${row.id}/`}>
                                            <NavItem>
                                                {problemTitle(row)}
                                            </NavItem>
                                        </LinkContainer>
                                    )) : ""
                                }
                                <NavItem
                                    href={`${Config.baseUrl}/api/problems/zip/`}
                                    download="problem.zip">
                                    Download Zip
                                </NavItem>
                            </Nav> 
                            
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
