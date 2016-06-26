import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import classNames from 'classnames';


class ExecuteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello World
                <Link to={`/test`}>not found</Link>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(ExecuteList);
