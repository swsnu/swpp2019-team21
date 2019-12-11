import React, { useState } from 'react';
import { history } from '../../store';
import profile from './../../assets/iu_profile.png';
import { Image, OverlayTrigger, Popover, ListGroup } from 'react-bootstrap';
import './TopMenuPopUp.css';

export default function TopMenuPopUp(props) {
    var overlay = React.createRef();
    const [show, setShow] = useState(false);

    var nickname = props.user.nickname;
    var pic = props.user.avatar ? props.user.avatar : profile;
    ////console.log(props.user.avatar);
    var point = props.user.point;
    var popuserinfo = (
        <Popover id="PopUserInfo" show={show}>
            <Popover.Title id="title" as="h3">
                Hello, <strong>{nickname}</strong>!
            </Popover.Title>
            <Popover.Content id="PopUserContent">
                <ListGroup id="PopUserMenuList">
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={event => {
                            props.mypageHandler();
                            overlay.hide();
                        }}>
                        <p align="center">
                            <Image
                                id="UserInfoImage"
                                className="img-responsive"
                                src={pic}
                                width="100px"
                                height="100px"
                                roundedCircle
                            />
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <text id="userPoint">Point {point}</text>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        id="my-page-btn"
                        onClick={event => {
                            props.mypageHandler();
                            overlay.hide();
                        }}>
                        My Page
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        id="sign-out-btn"
                        onClick={event => {
                            props.signOutHandler();
                            overlay.hide();
                        }}>
                        Sign Out
                    </ListGroup.Item>
                </ListGroup>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger
            id="user-popup"
            trigger="click"
            placement="bottom"
            ref={ref => (overlay = ref)}
            overlay={popuserinfo}>
            <Image
                id="UserImage"
                src={pic}
                width="50px"
                height="50px"
                roundedCircle
            />
        </OverlayTrigger>
    );
}
