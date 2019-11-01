import React, { Component, Profiler } from 'react';
import {
    Dropdown,
    DropdownButton,
    Navbar,
    Image,
    OverlayTrigger,
    Popover,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopMenu.css';
import profile from './../../assets/iu_profile.png';
import { connect } from 'react-redux';
import { history } from '../../store';
import * as actionCreators from '../../store/actions/user.action';
import TopMenuPopUp from './TopMenuPopUp';

class TopMenu extends Component {
    state = {
        sign_in: true,
        user: {
            pic: profile,
            name: 'JIEUN',
            point: 65535
        },
        searchkey: null
    };

    componentDidMount() {
        if (
            localStorage.getItem('logged_in') === 'true' &&
            !this.props.user.user_id
        ) {
            this.props.reloadUser();
        }
    }

    signInHandler = () => {
        history.push('/signin');
    };

    clickHomeHandler = () => {
        history.push('/home');
    };

    searchConfirmHandler = () => {
        if (!this.state.searchkey) alert('Input your Search Words.');
        else history.push(`/adposts/search=${this.state.searchkey}`);
    };

    keyPressHandler = e => {
        if (e.charCode === 13) this.searchConfirmHandler();
    };

    newArticleHandler = () => {
        if (this.props.logged_in) history.push('/article/create');
        else history.push('/signin');
    };

    render() {
        let signInButton = (
            <button value="signin" onClick={this.signInHandler}>
                Sign In
            </button>
        );
        let newArticleButton = (
            <btn onClick={this.newArticleHandler}>New Ad Request</btn>
        );

        return (
            <div className="TopMenu">
                <Navbar id="UserInfo" fixed="top">
                    <h1
                        id="AditTitle"
                        align="left"
                        onClick={this.clickHomeHandler}
                    >
                        Adit
                    </h1>
                    <div className="Search">
                        <input
                            id="ad-search-input"
                            type="text"
                            placeholder="Search"
                            onKeyPress={this.keyPressHandler}
                            onChange={event =>
                                this.setState({
                                    ...this.state,
                                    searchkey: event.target.value
                                })
                            }
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            onClick={this.searchConfirmHandler}
                        />
                        <i
                            className="fa fa-search"
                            id="search-confirm-button"
                            aria-hidden="true"
                            onClick={this.searchConfirmHandler}
                        ></i>
                    </div>
                    {this.props.logged_in && newArticleButton}
                    {this.props.logged_in && (
                        <TopMenuPopUp user={this.props.user} />
                    )}

                    {!this.props.logged_in && (
                        <button id="SignInButton" onClick={this.signInHandler}>
                            Sign In
                        </button>
                    )}
                </Navbar>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in,
        user: state.user.user
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onsignOut: () => dispatch(actionCreators.signOut()),
        reloadUser: () => dispatch(actionCreators.getUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu);
