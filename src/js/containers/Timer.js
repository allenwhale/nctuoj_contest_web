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
        this.props.dispatch(SystemActions.getTime());
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
        var day;
        var hour;
        var minute;
        var second;
        if(system_time < contest_start_time){
            timeinfo = (contest_start_time - system_time) / 1000;
        } else if(system_time < contest_end_time){
            timeinfo = (contest_end_time - system_time) / 1000;
        } else {
            timeinfo = "End";
        }
        if(timeinfo != "End"){
            second = timeinfo;
            minute = Math.floor(second / 60);
            hour   = Math.floor(minute / 60);
            day    = Math.floor(hour   / 24);
            hour   = "" + hour % 24;
            minute = "" + minute % 60;
            second = "" + second % 60;
            while(hour.length < 2) hour = "0" + hour;
            while(minute.length < 2) minute = "0" + minute;
            while(second.length < 2) second = "0" + second;
        }
        return (
            <div>
                { timeinfo != "End" ?
                    <div>{day} Days {hour} : {minute} : {second}</div> : "End"
                }
            </div>
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

