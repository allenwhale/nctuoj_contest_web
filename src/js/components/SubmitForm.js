import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label } from 'react-bootstrap';
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
                        <Form inline>
                            <FormGroup>
                                <ControlLabel>Execute Type</ControlLabel>
                                <FormControl ref="execute_type" componentClass="select" onChange={this.changeExecuteType}>
                                    <option value="C">C</option>
                                    <option value="C++">C++</option>
                                    <option value="Python">Python</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>keyMap</ControlLabel>
                                <FormControl componentClass="select" onChange={this.changeKeyMap}>
                                    <option value="default">Normal</option>
                                    <option value="vim">Vim</option>
                                    <option value="sublime">Sublime</option>
                                    <option value="emacs">Emacs</option>
                                </FormControl>
                            </FormGroup>
                        </Form>
                        <textarea ref="code"/>
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
