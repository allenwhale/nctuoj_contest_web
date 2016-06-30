import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, ControlLabel } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';
import * as ExecuteActions from './../../actions/Execute';

class ExecuteForm extends Component {

    constructor(props) {
        super(props);
        this.addCommand = this.addCommand.bind(this);
        this.deleteCommand = this.deleteCommand.bind(this);
        this.updateCommand = this.updateCommand.bind(this);
    }

    addCommand() {
        this.props.dispatch(ExecuteActions.addCommand());
    }

    deleteCommand(id) {
        this.props.dispatch(ExecuteActions.deleteCommand(id));
    }

    updateCommand(command) {
        this.props.dispatch(ExecuteActions.updateCommand(command));
    }

    render() {
        return (
            <div key={this.props.execute.execute.id}>
                <Form ref="form">
                    <input type="hidden" name="token" value={this.props.login.account.token} />
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel> 
                        <input 
                            name="description" 
                            className="form-control" 
                            type="text" 
                            defaultValue={this.props.execute.execute.description} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Default File Name</ControlLabel> 
                        <input 
                            name="file_name" 
                            className="form-control" 
                            type="text" 
                            defaultValue={this.props.execute.execute.file_name}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Commands</ControlLabel>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Command</th>
                                    <th>Delete</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {
                                    this.props.execute.execute.commands.mapArr((row) => (
                                        <tr>
                                            <td>
                                                <input 
                                                    key={row.id}
                                                    name="commands[]" 
                                                    defaultValue={row.command}
                                                    onChange={(n) => this.updateCommand({
                                                        id: row.id,
                                                        command: n.target.value,
                                                    })}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <Button 
                                                    bsStyle="danger"
                                                    onClick={() => this.deleteCommand(row.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                        <Button bsStyle="success" onClick={this.addCommand}>New</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        execute: state.execute,
    };
}

export default connect(mapStateToProps, null, null, {withRef: true})(ExecuteForm);
