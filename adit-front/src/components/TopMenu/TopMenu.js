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
import { connect } from 'net';
import { history } from '../../store';

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

    signOutHandler = () => {
        this.setState({ ...this.state, sign_in: true });
        history.push('/signin');
    };

    searchConfirmHandler = () => {
        if (!this.state.searchkey) alert('Input your Search Words.');
        else history.push(`/adposts/search=${this.state.searchkey}`);
    };

    keyPressHandler = e => {
        if (e.charCode === 13) this.searchConfirmHandler();
    };

    newArticleHandler = () => {
        if (this.state.sign_in) history.push('/article/create');
        else history.push('/signin');
    };

    render() {
        let popuserinfo = null;
        let overlaytrigger = null;
        let signInButton = null;
        let newArticleButton = (
            <btn onClick={this.newArticleHandler}>New Ad Request</btn>
        );
        if (this.state.sign_in) {
            popuserinfo = (
                <Popover id="PopUserInfo">
                    <Popover.Title as="h3">
                        <u1>
                            Hello, <strong>{this.state.user.name}</strong>!
                        </u1>
                    </Popover.Title>
                    <Popover.Content id="PopUserContent">
                        <ListGroup id="PopUserMenuList">
                            <ListGroup.Item
                                action
                                variant="light"
                                onClick={() =>
                                    history.push('/mypage')
                                }
                            >
                                <p align="center">
                                    <Image
                                        id="UserInfoImage"
                                        class="img-responsive"
                                        src={this.state.user.pic}
                                        width="100px"
                                        roundedCircle
                                    />
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <up>Point {this.state.user.point}</up>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="light"
                                onClick={() =>
                                    history.push('/mypage')
                                }
                            >
                                My Page
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="light"
                                onClick={() => this.signOutHandler()}
                            >
                                Sign Out
                            </ListGroup.Item>
                        </ListGroup>
                    </Popover.Content>
                </Popover>
            );
            overlaytrigger = (
                <OverlayTrigger
                    trigger="click"
                    placement="auto"
                    overlay={popuserinfo}
                >
                    <Image
                        id="UserImage"
                        src={this.state.user.pic}
                        width="55px"
                        roundedCircle
                    />
                </OverlayTrigger>
            );
        }
        return (
            <div className="TopMenu">
                <Navbar id="UserInfo" fixed="top">
                    <h1
                        id="AditTitle"
                        align="left"
                        onClick={() => history.push('/home')}
                    >
                        Adit
                    </h1>
                    <div class="Search">
                        <input
                            id="ad-search-input"
                            type="text"
                            placeHolder="Search"
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
                    {this.state.sign_in && newArticleButton}
                    {this.state.sign_in && overlaytrigger}
                    {!this.state.sign_in && signInButton}
                </Navbar>
            </div>
        );
    }
}

export default TopMenu;
