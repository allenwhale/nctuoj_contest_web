import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Grid, 
    Row, 
    Col,
    Nav,
    NavItem,
    Panel,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import classNames from 'classnames';
import nl2br from 'react-nl2br';

class Contest extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var freezeinfo;
        var freeze = this.props.contest.contest.freeze;
        if(freeze == 0){
            freezeinfo = "No freeze";
        } else if(freeze > 0){
            freezeinfo = "Freeze after contest start " + freeze + " minutes.";
        } else {
            freezeinfo = "Freeze before contest end " + freeze + " minutes.";
        }
        var zip_password;
        if(this.props.contest.contest.status == -1){
            zip_password = "";
        } else {
            zip_password = this.props.contest.contest.zip_password;
        }
        return (
            <div>
                <Row>
                    <Col md={12} className={classNames('text-center')}>
                        <h3>{this.props.contest.contest.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Panel header="Start">{this.props.contest.contest.start}</Panel>
                    </Col>
                    <Col md={3}>
                        <Panel header="End">{this.props.contest.contest.end}</Panel>
                    </Col>
                    <Col md={3}>
                        <Panel header="Freeze">{freezeinfo}</Panel>
                    </Col>
                    <Col md={3}>
                        <Panel header="Zip Password">{zip_password}</Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Description">
                            { nl2br(this.props.contest.contest.description) }
                        </Panel>
                    </Col> 
                </Row>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        contest: state.contest,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(Contest);
