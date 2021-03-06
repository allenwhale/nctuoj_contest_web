import React, { Component } from 'react';
import { 
    Modal, 
    Form, 
    FormGroup, 
    Col, 
    FormControl,
    ControlLabel, 
    Button, 
    Label 
} from 'react-bootstrap';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        horizontal
                        ref="form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Account
                            </Col>
                            <Col sm={10}>
                                <input className="form-control" type="account" placeholder="Account" name="account"/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <input className="form-control"  type="password" placeholder="Password" name="password"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button 
                                    ref="submit"
                                    onClick={this.props.login}
                                    type="submit"
                                > Login </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

