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
    Button,
    Checkbox,
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
        if(data.get('new_team') === null)
            data.set('new_team', '0')
        if(data.get('follow_rule') === null)
            data.set('follow_rule', '0')
        let team = prompt('Please enter your team name on the scoreboard');
        data.set('team', team)
        this.props.dispatch(UserActions.putUserUpload(data));
    }

    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={12}>
                            <Form ref="form" onSubmit={(e) => {e.preventDefault(); this.putUserUpload()}}>
                                <input type="hidden" name="token" value={this.props.user.account.token} />
                                <FormGroup>
                                    <ControlLabel>
                                        Take a photo of your team during the contest
                                    </ControlLabel>
                                    <input type="file" className="form-control" name="file" onChange={this.putUserUpload}/>
                                    { this.props.user.account.photo.length != 0 ?  <img style={{maxWidth: '50%'}} src="/api/users/photo/" /> : ''}
                                </FormGroup>
                                <FormGroup>
                                <Checkbox name="follow_rule" value="1" defaultChecked={this.props.user.account.follow_rule} onChange={this.putUserUpload} inline>
                                        We abide the rules during the contest.
                                        (You must check this item if you would like to receive the prize.)
                                    </Checkbox>
                                </FormGroup>
                                <FormGroup>
                                    <Checkbox name="new_team" value="1" defaultChecked={this.props.user.account.new_team} onChange={this.putUserUpload} inline>
                                        We never participated the ACM-ICPC.
                                        (You must check this item if you would like to receive the <b>newcomer prize</b>.)
                                    </Checkbox>
                                </FormGroup>
                            </Form>
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
