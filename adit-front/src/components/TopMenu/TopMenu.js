import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import './TopMenu.css';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';

class TopMenu extends Component {
    state = { sign_in : true, user : {
        pic: profile,
        name: 'JIEUN',
        point: 65535,
    } }

    render() {
        let popuserinfo = null;
        let overlaytrigger = null;
        if(this.state.sign_in){
            popuserinfo = (
                <Popover id='PopUserInfo'>
                    <Popover.Title as="h3"><u1>Hello, <strong>{this.state.user.name}</strong>!</u1></Popover.Title>
                    <Popover.Content id='PopUserContent'>
                        <ListGroup id='PopUserMenuList'>
                            <ListGroup.Item variant='light'>
                                <p align='center'><Image id='UserInfoImage' class='img-responsive' src={this.state.user.pic} width='100px' roundedCircle/></p> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <up>Point {this.state.user.point}</up>
                            </ListGroup.Item>
                            <ListGroup.Item action variant='light'>My Page</ListGroup.Item>
                            <ListGroup.Item action variant='light'>Sign Out</ListGroup.Item>
                        </ListGroup>
                    </Popover.Content>
                </Popover>
            )
            overlaytrigger = ( 
                <OverlayTrigger trigger='click' placement='auto' overlay={popuserinfo}>
                    <Image id='UserImage' src={this.state.user.pic} width='55px' roundedCircle/>
                </OverlayTrigger>
            )
        }
        return (
            <div className='TopMenu'>
                <Navbar id='UserInfo' fixed='top'>
                    <h1 id='AditTitle' align='left'>Adit</h1>
                    {overlaytrigger}
                </Navbar>
            </div>
        )
    }
}

export default TopMenu