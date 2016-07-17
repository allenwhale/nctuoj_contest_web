import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { 
    Grid, 
    Row, 
    Col, 
    Button,
    ListGroup,
    ListGroupItem,
    Modal,
    Form,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';
import classNames from 'classnames';
import * as ProblemActions from './../../actions/Problem';

class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.postProblem = this.postProblem.bind(this);
        this.postProblemMeta = this.postProblemMeta.bind(this);
        this.closeNewProblemForm = this.closeNewProblemForm.bind(this);
        this.openNewProblemForm = this.openNewProblemForm.bind(this);
        this.closeProblemErrMsg = this.closeProblemErrMsg.bind(this);
    }

    closeProblemErrMsg() {
        this.props.dispatch(ProblemActions.closeProblemErrMsg());
    }

    closeNewProblemForm() {
        this.props.dispatch(ProblemActions.closeNewProblemForm());
    }

    openNewProblemForm() {
        this.props.dispatch(ProblemActions.openNewProblemForm());
    }

    postProblem() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.form));
        this.props.dispatch(ProblemActions.postProblem(data));
    }

    postProblemMeta() {
        var data = new FormData(ReactDOM.findDOMNode(this.refs.metaForm));
        this.props.dispatch(ProblemActions.postProblemMeta(data));
    }

    render() {
        return (
            <div>
                <Row>
                    <Button 
                        onClick={this.openNewProblemForm}
                        bsStyle="success"
                        className={classNames('margin-bottom')}
                    >New Problem</Button>
                    <ListGroup>
                        {
                            this.props.problem.problemList.mapArr((row) => (
                                <ListGroupItem>
                                    <Link to={`/admin/problems/${row.id}/`}>
                                        {problemTitle(row)}
                                    </Link>
                                </ListGroupItem> 
                            ))
                        }
                    </ListGroup>
                </Row> 
                <Modal 
                    show={this.props.problem.newProblemFormShow} 
                    onHide={this.closeNewProblemForm}
                >
                    <Modal.Header>
                        <Modal.Title>
                            New Problem 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid={true}>
                            <Row>
                                <Col md={12}>
                                    <Form ref="metaForm">
                                        <input type="hidden" name="token" value={this.props.user.account.token}/>
                                        <FormGroup>
                                            <ControlLabel>Meta File</ControlLabel>
                                            <input type="file" className="form-control" name="zip" />
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                            <hr className="separator"/>
                            <Row>
                                <Col md={12}>
                                    <Form ref="form">
                                        <input type="hidden" name="token" value={this.props.user.account.token}/>
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
                                                <option value="0">sum</option>
                                                <option value="1">min</option>
                                            </select>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="warning" onClick={this.closeNewProblemForm}>
                            Cancel
                        </Button>
                        <Button bsStyle="success" onClick={this.postProblemMeta}>
                            Submit Meta
                        </Button>
                        <Button bsStyle="success" onClick={this.postProblem}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        problem: state.problem,
    };
}

export default connect(mapStateToProps)(ProblemList);
