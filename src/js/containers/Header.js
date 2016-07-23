import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import { 
    Navbar, 
    Nav, 
    NavItem, 
    MenuItem, 
    NavDropdown,
} from 'react-bootstrap';
import * as SubmissionActions from './../actions/Submission';
import * as UserActions from '../actions/User';

class Header extends Component {
    constructor(props) {
        super(props);
        this.openLoginForm = this.openLoginForm.bind(this);
        this.openSubmitForm = this.openSubmitForm.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch(UserActions.logout());
    }

    openLoginForm() {
        this.props.dispatch(UserActions.openLoginForm());
    }

    openSubmitForm() {
        this.props.dispatch(SubmissionActions.openSubmitForm(true));
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
        var show_scoreboard = this.props.contest.contest >= 0 || this.props.user.account.isADMIN;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Contest</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { this.props.user.account.isLOGIN ?
                        <Nav>
                            <LinkContainer to="/submissions/">
                                <NavItem>Submissions</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/clarifications/">
                                <NavItem>Clarifications</NavItem>
                            </LinkContainer>
                            <NavItem onClick={this.openSubmitForm}>
                                Quick Submit
                            </NavItem>
                            { show_scoreboard ? 
                                <LinkContainer to="/scoreboard/">
                                    <NavItem>Scoreboard</NavItem>
                                </LinkContainer> : ""
                            }
                            { this.props.user.account.isADMIN ? 
                                <LinkContainer to="/admin/">
                                    <NavItem>Admin</NavItem>
                                </LinkContainer> : ""
                            }
                        </Nav> : <Nav> <LinkContainer to="/scoreboard/"><NavItem>Scoreboard</NavItem></LinkContainer> </Nav>
                        }
                        <Nav pullRight>
                            <NavItem>
                                {timeinfo}
                            </NavItem>
                            {
                                this.props.user.account.isLOGIN ?  [
                                    <LinkContainer to="/user/"> 
                                        <NavItem key="0">
                                            Hi { this.props.user.account.name }
                                        </NavItem> 
                                    </LinkContainer>, 
                                    <NavItem key="1" onClick={this.logout}>Logout</NavItem>
                                    ] : <NavItem key="2" onClick={this.openLoginForm}>Login</NavItem>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.user,
        system: state.system,
        contest: state.contest,
    };
}

export default connect(mapStateToProps)(Header);
