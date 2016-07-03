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
            <Nav stacked >
                {
                    this.props.problemList.mapArr((row) => (
                        <LinkContainer key={row.id} to={`/problems/${row.id}/`}>
                            <NavItem>{row.title}</NavItem>
                        </LinkContainer>
                        ))
                }
            </Nav>
        );
    }
}
