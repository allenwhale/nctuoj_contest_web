import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel } from 'react-bootstrap';

import classNames from 'classnames';
import * as ClarificationActions from './../actions/Clarification';


class Clarification extends Component {
    constructor(props) {
        super(props);
        this.getClarification = this.getClarification.bind(this);
        this.putClarification = this.putClarification.bind(this);
        this.getClarification();
    }

    getClarification() {
        var data = {
            id: this.props.params.id,
            token: this.props.login.account.token,
        };
        this.props.dispatch(ClarificationActions.getClarification(data));
    }

    putClarification() {
        console.log('put');
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form))
        this.props.dispatch(ClarificationActions.putClarification(data));
    }

    render() {
        var replyable = this.props.login.account.isADMIN &&
            typeof(this.props.clarification.clarification.reply) != 'undefined' && 
            this.props.clarification.clarification.reply.length == 0;
        console.log(replyable);
        return (
            <div key={this.props.clarification.clarification.id}>
                <Grid fluid={true}>
                    <Row>
                        <h2>
                            Clarification {this.props.clarification.clarification.id}
                            <Link 
                                className="btn btn-default" 
                                to="/clarifications/"
                                style={{float: 'right'}}
                            >
                                Back to List
                            </Link>
                        </h2>
                    </Row>
                    <Row>
                        <Form ref="form">
                            <input name="id" type="hidden" value={this.props.params.id}/>
                            <input name="token" type="hidden" value={this.props.login.account.token}/>
                            <FormGroup>
                                <ControlLabel>Question</ControlLabel>
                                <textarea 
                                    className="form-control"
                                    defaultValue={this.props.clarification.clarification.question}
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>
                                    <input name="reply_type" value="0" type="radio" defaultChecked/>
                                    For User #{this.props.clarification.clarification.user_id}
                                </ControlLabel>
                                {' '}
                                <ControlLabel>
                                    <input name="reply_type" value="1" type="radio"/>
                                    For All User
                                </ControlLabel>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Reply</ControlLabel>
                                <textarea 
                                    name="reply"
                                    className="form-control"
                                    defaultValue={this.props.clarification.clarification.question}
                                    readOnly={!replyable}
                                />
                            </FormGroup>
                            {
                                replyable ? 
                                    <FormGroup>
                                        <Button onClick={this.putClarification}>Submit</Button>
                                    </FormGroup> : ""
                            }
                        </Form>
                    </Row>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        clarification: state.clarification,
    };
}

export default connect(mapStateToProps)(Clarification);

