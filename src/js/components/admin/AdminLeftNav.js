import React, { Component } from 'react';
import { Link } from 'react-router';
import { 
    Nav, 
    NavItem 
} from 'react-bootstrap';
import classNames from 'classnames';
import { LinkContainer } from 'react-router-bootstrap';

export default class Base extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav stacked>
                <LinkContainer to="/admin/">
                    <NavItem>Contest</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin/users/">
                    <NavItem>Users</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin/problems/">
                    <NavItem>Problems</NavItem> 
                </LinkContainer>
                <LinkContainer to="/admin/executes/">
                    <NavItem>Executes</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin/db/">
                    <NavItem>Database</NavItem>
                </LinkContainer>
            </Nav>
        );
    }
}
