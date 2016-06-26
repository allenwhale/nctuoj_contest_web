import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import classNames from 'classnames';

export default class Base extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav bsStyle="pills" stacked>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/admin/problems/">Problems</Link>
                </li>
                <li>
                    <Link to="/admin/executes/">Executes</Link>
                </li>
            </Nav>
        );
    }
}
