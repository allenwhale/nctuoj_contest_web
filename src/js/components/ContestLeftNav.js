import React, { Component } from 'react';
import { Link } from 'react-router';
import { 
    Nav, 
    NavItem, 
    NavDropdown, 
    MenuItem 
} from 'react-bootstrap';
import classNames from 'classnames';
import { LinkContainer } from 'react-router-bootstrap'

export default class Base extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav 
                activeKey={-1} 
                stacked
            >
                <LinkContainer to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/submissions/">
                    <NavItem>Submissions</NavItem>
                </LinkContainer>
                {
                    this.props.problemList.mapArr((row) => (
                        <LinkContainer key={row.id} to={`/problems/${row.id}/`}>
                            <NavItem>{row.title}</NavItem>
                        </LinkContainer>
                        ))
                }
                <LinkContainer to="/clarifications/">
                    <NavItem>Clarification</NavItem>
                </LinkContainer>
                {
                    this.props.isADMIN ? 
                        <LinkContainer to="/admin/">
                            <NavItem>Admin</NavItem>
                        </LinkContainer> : ""
                }
            </Nav>
        );
    }
}
