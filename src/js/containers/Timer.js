import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as SystemActions from '../actions/System';
const UPDATE_INTERVAL = 60;
class Timer extends Component {
    constructor(props) {
        super(props);
        this.getTime = this.getTime.bind(this);
        this.increaseTime = this.increaseTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.timeUpdateCount = 0;
        setInterval(this.updateTime, 1000);
    }

    updateTime() {
        if(this.timeUpdateCount == 0) {
            this.getTime();
        } else {
            this.increaseTime();
        }
        this.timeUpdateCount = (this.timeUpdateCount + 1) % UPDATE_INTERVAL;
    }

    getTime() {
        var data = {
            token: this.props.user.account.token,
        };
        this.props.dispatch(SystemActions.getTime(data));
    }

    increaseTime() {
        var time = this.props.system.time;
        time.setSeconds(time.getSeconds() + 1);
        this.setState({
            system: {
                ...this.props.system,
                time,
            },
        });
    }

    render() {
        var timeinfo;
        var contest_start_time = new Date(this.props.contest.contest.start);
        var contest_end_time = new Date(this.props.contest.contest.end);
        var system_time = this.props.system.time;
        if(system_time < contest_start_time){
            var remain = Math.floor((contest_start_time - system_time) / 1000 / 60);
            timeinfo = "Start in " + Math.floor(remain / 60) + " hr " + (remain % 60) + " min ";
        } else if(system_time < contest_end_time){
            var remain = Math.floor((contest_end_time - system_time) / 1000 / 60);
            timeinfo = Math.floor(remain / 60) + " hr " + (remain % 60) + " min ";
        } else {
            timeinfo = "End";
        }
        return (
            <div>{timeinfo}</div>
        );
    }
}


function mapStateToProps(state) {
    return {
        system: state.system,
        contest: state.contest,
    };
}

export default connect(mapStateToProps)(Timer);

