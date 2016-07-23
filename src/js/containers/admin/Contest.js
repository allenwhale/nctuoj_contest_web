import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import {
    Form,
    FormGroup,
    ControlLabel,
    InputGroup,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css');
import * as ContestActions from './../../actions/Contest';
import classNames from 'classnames';


class Contest extends Component {
    constructor(props) {
        super(props);
        this.putContest = this.putContest.bind(this);
    }

    putContest() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        data.append('start', this.refs.start.getValue());
        data.append('end', this.refs.end.getValue());
        console.log(data.get('start'));
        this.props.dispatch(ContestActions.putContest(data));
    }

    render() {
        console.log(this.props.contest.contest);
        return (
            this.props.contest.contestStatus ? 
            <div key={this.props.contest.contest.id}>
                <Form ref="form">
                    <input type="hidden" name="token" value={this.props.user.account.token} />
                    <Row className={classNames('margin-bottom')}>
                        <FormGroup>
                            <Col md={12}>
                                <ControlLabel>Title</ControlLabel>
                                <input 
                                    defaultValue={this.props.contest.contest.title}
                                    className="form-control"
                                    name="title"
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className={classNames('margin-bottom')}>
                        <FormGroup>
                            <Col md={6}>
                                <ControlLabel>Contest Time</ControlLabel>
                                <InputGroup>
                                    <DateTimeField 
                                        ref="start"
                                        inputFormat='YYYY-MM-DD HH:mm:ss'
                                        format="YYYY-MM-DD HH:mm:ss"
                                        defaultText={this.props.contest.contest.start}
                                    />
                                    <InputGroup.Addon>to</InputGroup.Addon>
                                    <DateTimeField
                                        ref="end" 
                                        inputFormat='YYYY-MM-DD HH:mm:ss'
                                        format="YYYY-MM-DD HH:mm:ss"
                                        defaultText={this.props.contest.contest.end}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <ControlLabel>Freeze Time</ControlLabel>
                                <input 
                                    name="freeze"
                                    defaultValue={this.props.contest.contest.freeze}
                                    className="form-control"
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className={classNames('margin-bottom')}>
                        <FormGroup>
                            <Col md={12}>
                                <ControlLabel>Description</ControlLabel>
                                <textarea 
                                    name="description"
                                    className="form-control"
                                    defaultValue={this.props.contest.contest.description}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col md={12}>
                                <Button bsStyle="success" onClick={this.putContest}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Row>
                </Form>
            </div> : <div></div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        contest: state.contest,
    };
}

export default connect(mapStateToProps)(Contest);
