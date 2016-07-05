import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

//import style from './Base.styl';
import classNames from 'classnames';

import { Table } from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import * as TestActions from './../actions/Test';

class Master extends Component {
    constructor(props) {
        super(props);
        this.changeList = this.changeList.bind(this);
        setInterval(this.changeList, 1000);
    }
    
    changeList() {
        console.log(this.props.test.test);
        this.props.dispatch(TestActions.changeList());
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>AAA</th>
                            <th>BBB</th>
                        </tr>
                    </thead>
                        <FlipMove typeName="tbody" easing="cubic-bezier(0, 0.7, 0.8, 0.1)" enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
                        {
                            this.props.test.test.map((row) => (
                                <tr key={row}>
                                    <td style={{backgroundColor: row%2==0?'red':'blue'}}>{row}</td>
                                    <td>{row}</td>
                                </tr>
                            ))
                        }
                        </FlipMove> 
                </Table>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        test: state.test,
    };
}

export default connect(mapStateToProps)(Master);

