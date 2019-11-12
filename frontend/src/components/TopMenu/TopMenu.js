import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import profile from './../../assets/iu_profile.png';
import { history } from '../../store';
import { userActions } from '../../store/actions';
import TopMenuPopUp from './TopMenuPopUp';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TopMenu.css';

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
        if (localStorage.getItem('logged_in') === 'true') {
            this.props.reloadUser();
        }
    }

    // componentDidUpdate() {
    //     if (localStorage.getItem('logged_in') === 'true') {
    //         this.props.reloadUser();
    //     }
    // }

    signInHandler = () => {
        history.push('/signin');
    };

    clickHomeHandler = () => {
        history.push('/home');
    };

    clickSignOutHandler = () => {
        this.props.onsignOut();
    };

    clickMyPageHandler = () => {
        history.push('/mypage');
    };

    searchConfirmHandler = () => {
        if (!this.state.searchkey) alert('Input your Search Words.');
        else
            history.push(`/adposts/search/${this.state.searchkey}/${'string'}`);
    };

    keyPressHandler = e => {
        if (e.charCode === 13) this.searchConfirmHandler();
    };

    newArticleHandler = () => {
        if (this.props.logged_in) history.push('/article/create');
        else history.push('/signin');
    };

    render() {
        return (
            <div className="TopMenu">
                <Navbar id="UserInfo" fixed="top">
                    <h1
                        id="AditTitle"
                        align="left"
                        onClick={this.clickHomeHandler}>
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
                            color="#f1f2f3"
                            icon={faSearch}
                            onClick={this.searchConfirmHandler}
                        />
                        <i
                            className="fa fa-search"
                            id="search-confirm-button"
                            aria-hidden="true"
                            onClick={this.searchConfirmHandler}></i>
                    </div>
                    {this.props.logged_in && (
                        <a id="ad-add-btn" onClick={this.newArticleHandler}>
                            New Ad Request
                        </a>
                    )}
                    {this.props.logged_in && (
                        <TopMenuPopUp
                            user={this.props.user}
                            mypageHandler={this.clickMyPageHandler}
                            signOutHandler={this.clickSignOutHandler}
                        />
                    )}

                    {!this.props.logged_in && (
                        <a id="sign-in-btn" onClick={this.signInHandler}>
                            Sign In
                        </a>
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
        onsignOut: () => dispatch(userActions.signOut()),
        reloadUser: () => dispatch(userActions.getUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu);
