import React from 'react';
import './TopMenu.css';
import { history } from '../../store';
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

var clickMypageHandler = () => {
    history.push('/mypage');
};

var signOutHandler = () => {
    this.props.onsignOut();
    history.push('/signin');
};

export default function TopMenuPopUp(props) {
    var popuserinfo = (
        <Popover id="PopUserInfo">
            <Popover.Title as="h3">
                <u1>
                    Hello, <strong>{props.user.name}</strong>!
                </u1>
            </Popover.Title>
            <Popover.Content id="PopUserContent">
                <ListGroup id="PopUserMenuList">
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={clickMypageHandler}
                    >
                        <p align="center">
                            <Image
                                id="UserInfoImage"
                                class="img-responsive"
                                src={props.user.pic}
                                width="100px"
                                roundedCircle
                            />
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <up>Point {props.user.point}</up>
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={clickMypageHandler}
                    >
                        My Page
                    </ListGroup.Item>
                    <ListGroup.Item
                        action
                        variant="light"
                        onClick={signOutHandler}
                    >
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
                src={props.user.pic}
                width="55px"
                roundedCircle
            />
        </OverlayTrigger>
    );
}
