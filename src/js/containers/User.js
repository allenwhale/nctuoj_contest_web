import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    ControlLabel,
    Button
} from 'react-bootstrap';

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={12}>
                            <h3>Upload </h3>
                            <Form>
                                <FormGroup>
                                    <ControlLabel>Upload File</ControlLabel>
                                    <input type="file" className="form-control" name="file" />
                                </FormGroup>
                            </Form>
                            <Button
                                bsStyle="success"
                                onClick={() => {}}
                            >Upload</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h3>
                                Download Code
                                {' '}
                                <Button
                                    bsStyle="success"
                                >download</Button>
                            </h3>
                        </Col>
                    </Row>
                </Grid>
            </div>
        ); 
    }
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(User);
