import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router'
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <footer 
                className={classNames(this.props.className, 'footer', 'text-center')}
                style={{backgroundColor: "#E7E7E7"}}
            >
                <Grid fluid={true}>
                    <Row>
                        <Col md={3} mdOffset={2}>
                            <h3>Developer</h3>
                            <p>ChunKai, Chen @ <a href="http://fogworkshop.com/" target="_blank">fogworkshop</a></p>
                            <p>Ho-Lun, Wu @ <a href="http://fogworkshop.com/" target="_blank">fogworkshop</a></p>
                        </Col>
                        <Col md={2}>
                            <h3>Contact us</h3>
                            <p><a href="mailto:wingemerald@gmail.com">wingemerald@gmail.com</a></p>
                            <p><a href="mailto:allencat850502@gmail.com">allencat850502@gmail.com</a></p>
                        </Col>
                        <Col md={3}>
                            <h3>Others</h3>
                            <p><Link to="/special/">Special Thanks</Link></p>
                            <p>Developer Diary</p>
                            <p>Privacy Policy</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className={classNames(this.props.className, 'text-center')}>
                            Copyright @ 2015-2016. All rights reserved.
                        </Col>
                    </Row>
                </Grid>
            </footer>
        );
    }

};

