import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import classNames from 'classnames';

export default class Base extends Component {

    constructor(props) {
        super(props);
        console.log('active', this.props.activeKey);
    }

    render() {
        return (
            <Nav bsStyle="pills" stacked activeKey={ this.props.activeKey }>
                <NavItem eventKey={0} href="/"> Home </NavItem>
                {
                    this.props.problemList.map((row) => (
                        <NavItem eventKey={ row.id }>{ row.title }</NavItem>
                    ))
                }
            </Nav>
        );
    }
}
