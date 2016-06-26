import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AdminLeftNav from './../../components/admin/AdminLeftNav';

export default class AdminFrame extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={2}>
                            <AdminLeftNav />
                        </Col> 
                        <Col md={10}>
                            { this.props.children }
                        </Col> 
                    </Row>
                </Grid>
            </div>
        );
    }
}
