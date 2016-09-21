import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { 
    Navbar, 
    Nav, 
    NavItem, 
    MenuItem, 
    NavDropdown,
} from 'react-bootstrap';
import * as SubmissionActions from './../actions/Submission';
import * as UserActions from '../actions/User';
import Timer from './Timer';

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
        var show = (this.props.user.account.isLOGIN && this.props.contest.contest.status >= 0) || this.props.user.account.isADMIN;
        var repliedClarification = Object.keys(this.props.clarification.clarificationList).filter(
            (key) => {
                if(key === "null" || key === "undefined") {
                    return false;
                }
                else {
                    if(this.props.user.account.isADMIN){
                        return this.props.clarification.clarificationList[key].question.length
                    }else{
                        return this.props.clarification.clarificationList[key].reply.length
                    }
                }
            }
        ).length;
        if(this.lastRepliedClarification !== undefined && this.lastRepliedClarification !== repliedClarification){
            const notify = new Notify('New Clarification', {
                body: 'You get new clarification !!!'
            });
            notify.show();
        }
        if(this.props.clarification.clarificationList[null] !== undefined)
            this.lastRepliedClarification = repliedClarification;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/"><div>Contest</div></LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        { show ? [
                            <LinkContainer key="0" to="/submissions/">
                                <NavItem>Submissions</NavItem>
                            </LinkContainer>,
                            <LinkContainer key="1" to="/clarifications/">
                            <NavItem>
                            Clarifications
                            { repliedClarification ? 
                                <font color="red">
                                <strong>
                                {' ' + repliedClarification}
                                </strong>
                                </font> : ""}
                            </NavItem>
                            </LinkContainer>,
                            <NavItem       key="2" onClick={this.openSubmitForm}>
                                Quick Submit
                            </NavItem>] : ""
                        }
                        { this.props.contest.contest.status >= 0 || this.props.user.account.isADMIN ? 
                            <LinkContainer to="/scoreboard/">
                                <NavItem>Scoreboard</NavItem>
                            </LinkContainer> : ""
                            
                        }
                        { this.props.user.account.isADMIN ? 
                            <LinkContainer to="/admin/">
                                <NavItem>Admin</NavItem>
                            </LinkContainer> : ""
                        }
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            <Timer />
                        </NavItem>
                        {
                            this.props.user.account.isLOGIN ?  [
                                <LinkContainer key="0" to="/user/"> 
                                    <NavItem>
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
        clarification: state.clarification,
        routing: state.routing,
    };
}

export default connect(mapStateToProps)(Header);
