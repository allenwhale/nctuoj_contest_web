import React, { Component } from 'react';
import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label } from 'react-bootstrap';

export default class Base extends Component {

    constructor(props) {
        super(props);
    }

    Close() {
        console.log('closeeee');
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>Login</Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Account
                            </Col>
                            <Col sm={10}>
                                <FormControl type="account" placeholder="Account" ref="account"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Password" ref="password"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.props.signIn}> Sign in </Button>
                                <div style={{float: "right", color: "red"}}>{ this.props.loginErr }</div>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

