import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export default class NewProblemForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header>
                        <Modal.Title>
                            New Problem 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid={true}>
                            <Row>
                                <Col md={10} mdOffset={1}>
                                    <Form ref="form" horizontal>
                                        <input type="hidden" name="token" value={this.props.token}/>
                                        <FormGroup>
                                            <ControlLabel>Title</ControlLabel>
                                            <input className="form-control" name="title"></input>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Pdf</ControlLabel>
                                            <input className="form-control" name="pdf" type="file">
                                            </input>
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Score Type</ControlLabel>
                                            <select className="form-control" name="score_type" componentClass="select">
                                                <option value="1">sum</option>
                                                <option value="2">min</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button bsStyle="success" onClick={this.props.submit}>Submit</Button>
                                        </FormGroup>
                                        <FormGroup>
                                            { this.props.errMsg != '' ? 
                                                <Alert bsStyle="danger">
                                                    { this.props.errMsg }
                                                </Alert> : null
                                            }
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
