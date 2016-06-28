import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label } from 'react-bootstrap';
import classNames from 'classnames';
import Codemirror from 'codemirror';
require('codemirror/mode/clike/clike');
require('codemirror/mode/python/python');
require('codemirror/keymap/vim');
require('codemirror/keymap/sublime');
require('codemirror/keymap/emacs');

const map_lang_mode = {
    'C': 'text/x-csrc',
    'C++': 'text/x-c++src',
    'Python': 'text/x-python',
};

export default class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.changeExecuteType = this.changeExecuteType.bind(this);
        this.changeKeyMap = this.changeKeyMap.bind(this);
        this.onEntered = this.onEntered.bind(this);
    }
    onEntered() {
        const options = {
            lineNumbers: true,
            matchBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            autofocus: true,
            mode: map_lang_mode[ReactDOM.findDOMNode(this.refs['execute_type']).value]
        };
        this.code = Codemirror.fromTextArea(ReactDOM.findDOMNode(this.refs.code), options);
    }

    changeExecuteType(row) {
        this.code.setOption('mode', map_lang_mode[row.target.value]);
    }

    changeKeyMap(row) {
        this.code.setOption('keyMap', row.target.value);
    }

    render() {
        return (
            <div>
                <Modal 
                    show={this.props.show} 
                    onHide={this.props.onHide}
                    onEntered={this.onEntered}
                    bsSize="lg"
                >
                    <Modal.Header>Submit Code</Modal.Header>
                    <Modal.Body>
                        <Form inline ref="form">
                            <FormGroup className={classNames("margin-bottom")}>
                                <ControlLabel>Execute Type: </ControlLabel>
                                {' '}
                                <select 
                                    className="form-control"
                                    name="execute_type_id" 
                                    ref="execute_type"
                                    onChange={this.changeExecuteType}
                                >
                                    {
                                        this.props.executeList.map((row) => (
                                            <option key={row.id} value={row.id}>{row.description}</option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                            {' '}
                            <FormGroup className="margin-bottom">
                                <ControlLabel>keyMap:</ControlLabel>
                                {' '}
                                <select onChange={this.changeKeyMap} className="form-control">
                                    <option value="default">Normal</option>
                                    <option value="vim">Vim</option>
                                    <option value="sublime">Sublime</option>
                                    <option value="emacs">Emacs</option>
                                </select>
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <ControlLabel>File:</ControlLabel>
                                {' '}
                                <input type="file" name="file" className="form-control"/>
                            </FormGroup>
                            <Panel header={
                                <div>
                                    <ControlLabel>File Name: </ControlLabel>
                                    {' '}
                                    <input name="file_name" className="form-control" />
                                </div>
                                }
                            >
                                <textarea className="form-control" name="code" ref="code"/>
                            </Panel>
                        </Form>
                        <Button 
                            bsStyle="success" 
                            onClick={() => {
                                this.code.save();
                                this.props.onSubmit();
                            }}
                        >Submit</Button>
                        <Button bsStyle="warning" onClick={this.props.onHide}>Cancel</Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
