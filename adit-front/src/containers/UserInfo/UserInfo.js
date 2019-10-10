import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import UserDetail from '../../components/UserDetail/UserDetail'
//import './UserInfo.css'
import avatar from '../../assets/avatar.png'

class UserInfo extends Component {
    userinfo = {email:'csh3695@naver.com', fname:'Seonghwan', lname:'Choi',point:0x7fffffff}

    render(){
        return(
            <div className='UserInfo'>
                <UserDetail {...this.userinfo} />
            </div>
        )
    }
}

export default UserInfo