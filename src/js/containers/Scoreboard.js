import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import {
    Grid,
    Table
} from 'react-bootstrap';
import FlipMove from 'react-flip-move';
import * as ScoreboardActions from './../actions/Scoreboard';
import classNames from 'classnames';
require('./../../assets/styles/scoreboard.sass');
const REFRESH_INTERVAL = 5000;

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.getScoreboard = this.getScoreboard.bind(this);
        this.refreshScoreboard = this.refreshScoreboard.bind(this);
        this.refresh = true;
        this.getScoreboard();
        setTimeout(this.refreshScoreboard, REFRESH_INTERVAL);
    }

    componentWillUnmount() {
        this.refresh = false;
    }

    refreshScoreboard() {
        if(this.refresh) {
            this.getScoreboard();
            setTimeout(this.refreshScoreboard, REFRESH_INTERVAL);
        }
    }

    getScoreboard() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(ScoreboardActions.getScoreboard(data));
    }

    render() {
        const {users, problems} = this.props.scoreboard.scoreboard.data;
        return (
            <div>
                <Grid>
                    <Table hover bordered condensed responsive >
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Solve</th>
                                <th>Penalty</th>
                                {
                                    problems.map((row) => (
                                        <th key={row.id}>{chr(ord('A') + row.id - 1)}</th>
                                        ))
                                }
                                <th>Total att/sol</th>
                            </tr>
                        </thead>
                        <FlipMove typeName="tbody" easing="cubic-bezier(0, 0.7, 0.8, 0.1)" enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
                            {
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.rank}</td>
                                        <td>{user.name}</td>
                                        <td>{user.ac}</td>
                                        <td>{user.penalty}</td>
                                        {
                                            user.problems.map((problem) => {
                                                if(problem.verdict_id == 0) {
                                                    return (<td></td>);
                                                }else if(problem.verdict_id == 1 || problem.verdict_id == 2) {
                                                    return (
                                                        <td 
                                                            key={problem.id} 
                                                            className="pending"
                                                        >
                                                            {problem.attempt}
                                                        </td>
                                                        );
                                                }else if(problem.verdict_id == 10) {
                                                    return (
                                                        <td 
                                                            className="ac"
                                                            key={problem.id}
                                                        >
                                                            {`${problem.attempt}/${problem.ac_time}`}
                                                        </td>
                                                        );
                                                }else{
                                                    return (
                                                        <td 
                                                            className="wa"
                                                            key={problem.id}
                                                        >
                                                            {problem.attempt}
                                                        </td>
                                                        );
                                                }
                                            })
                                        }
                                        <td>{`${user.attempt}/${user.ac}`}</td>
                                    </tr> 
                                ))
                            } 
                            <tr>
                                <td></td>
                                <td><strong>sol/att</strong></td>
                                <td></td>
                                <td></td>
                                {
                                    problems.map((problem) => (
                                        <td>{`${problem.ac}/${problem.attempt}`}</td>
                                    ))
                                }
                                <td></td>
                            </tr>
                        </FlipMove>
                    </Table>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        scoreboard: state.scoreboard,
    };
}

export default connect(mapStateToProps)(Scoreboard);

