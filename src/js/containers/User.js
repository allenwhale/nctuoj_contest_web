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
import Config from './../utils/Config';
import * as UserActions from './../actions/User';

class User extends Component {
    constructor(props) {
        super(props);
        this.putUserUpload = this.putUserUpload.bind(this);
    }

    putUserUpload() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(UserActions.putUserUpload(data));
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={12}>
                            <h3>Upload </h3>
                            <Form ref="form">
                                <input type="hidden" name="token" value={this.props.user.account.token} />
                                <FormGroup>
                                    <ControlLabel>Upload File</ControlLabel>
                                    <input type="file" className="form-control" name="file" />
                                </FormGroup>
                            </Form>
                            <Button
                                bsStyle="success"
                                onClick={this.putUserUpload}
                            >Upload</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h3>
                                Download Code
                                {' '}
                                <a
                                    className="btn btn-success"
                                    href={`${Config.baseUrl}/api/users/code/?token=${this.props.user.account.token}`}
                                    download="code.zip"
                                >download</a>
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
