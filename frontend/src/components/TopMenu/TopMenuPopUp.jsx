import React from 'react';
import { history } from '../../store';
import profile from './../../assets/iu_profile.png';
import {
    Image,
    OverlayTrigger,
    Popover,
    ListGroup,
} from 'react-bootstrap';
import './TopMenuPopUp.css';

export default function TopMenuPopUp(props) {
    var pic = null;
    var nickname = null;
    var point = null;
    if(props.user){
        nickname = props.user.nickname;
        pic = (props.user.pic)? props.user.pic : profile;
        point = props.user.point
    }
    var popuserinfo = (
        <Popover id="PopUserInfo">
            <Popover.Title as="h3">
                <u1>
                    Hello, <strong>{nickname}</strong>!
                </u1>
            </Popover.Title>
            <Popover.Content id="PopUserContent">
                <ListGroup id="PopUserMenuList">
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={props.mypageHandler}>
                        <p align="center">
                            <Image
                                id="UserInfoImage"
                                className="img-responsive"
                                src={pic}
                                width="100px"
                                roundedCircle
                            />
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <up>Point {point}</up>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={props.mypageHandler}>
                        My Page
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={props.signOutHandler}>
                        Sign Out
                    </ListGroup.Item>
                </ListGroup>
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="auto" overlay={popuserinfo}>
            <Image
                id="UserImage"
                src={pic}
                width="55px"
                roundedCircle
            />
        </OverlayTrigger>
    );
}
