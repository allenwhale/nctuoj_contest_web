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
        return (
            <div>
                <Row>
                    <Col md={12} className={classNames('text-center')}>
                        <h3>{this.props.contest.contest.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Panel header="Start">{this.props.contest.contest.start}</Panel>
                    </Col>
                    <Col md={4}>
                        <Panel header="End">{this.props.contest.contest.end}</Panel>
                    </Col>
                    <Col md={4}>
                        <Panel header="Freeze">{this.props.contest.contest.freeze}</Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header="Description">
                            { nl2br(this.props.contest.contest.description) }
                        </Panel>
                    </Col> 
                </Row>
                { this.props.user.account.isLOGIN ? 
                <Row>
                    <Col md={12}>
                        <Panel header="Problems">
                            <ListGroup fill>
                                {
                                    this.props.problem.problemList.mapArr((row) => (
                                        <ListGroupItem key={row.id}>{row.title}</ListGroupItem> 
                                    ))
                                }
                            </ListGroup> 
                        </Panel>
                    </Col> 
                </Row> : "" }
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
