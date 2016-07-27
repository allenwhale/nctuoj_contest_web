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
        var show = this.props.contest.contest.status >= 0 || this.props.user.account.isADMIN;
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
                                <NavItem>Clarifications</NavItem>
                            </LinkContainer>,
                            <NavItem       key="2" onClick={this.openSubmitForm}>
                                Quick Submit
                            </NavItem>,
                            <LinkContainer key="3" to="/scoreboard/">
                                <NavItem>Scoreboard</NavItem>
                            </LinkContainer>] : ""

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
        routing: state.routing,
    };
}

export default connect(mapStateToProps)(Header);
