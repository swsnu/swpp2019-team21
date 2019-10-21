import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import './TopMenu.css';
import profile from './../../assets/iu_profile.png'
import history from '../../index'
import { connect } from 'net';

class TopMenu extends Component {
    state = { sign_in: true, user : {
        pic: profile,
        name: 'JIEUN',
        point: 65535,
<<<<<<< Updated upstream
    } }
=======
        }, searchkey: null,
    }
>>>>>>> Stashed changes

    SignOutHandler = () => {
        this.setState({...this.state, sign_in: true})
        window.location.assign('/signin')
    }

<<<<<<< Updated upstream
=======
    searchConfirmHandler = () => {
        if(!this.state.searchkey) alert('Input your Search Words.')
        else window.location.assign(`/adposts/search=${this.state.searchkey}`)
    }
    
    keyPressHandler = (e) => {
        if(e.charCode === 13) this.searchConfirmHandler()
    }

    newArticleHandler = () => {
        if(this.state.sign_in) window.location.assign('/article/create')
        else window.location.assign('/signin')
    }

>>>>>>> Stashed changes
    render() {
        let popuserinfo = null;
        let overlaytrigger = null;
        let signInButton = null;
        let newArticleButton = <btn onClick = {this.newArticleHandler}>New Ad Request</btn>
        if(this.state.sign_in){
            popuserinfo = (
                <Popover id='PopUserInfo'>
                    <Popover.Title as="h3"><u1>Hello, <strong>{this.state.user.name}</strong>!</u1></Popover.Title>
                    <Popover.Content id='PopUserContent'>
                        <ListGroup id='PopUserMenuList'>
                            <ListGroup.Item action variant='light' onClick = {() => window.location.assign('/mypage')}>
                                <p align='center'><Image id='UserInfoImage' class='img-responsive' src={this.state.user.pic} width='100px' roundedCircle/></p> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <up>Point {this.state.user.point}</up>
                            </ListGroup.Item>
                            <ListGroup.Item action variant='light' onClick = {() => window.location.assign('/mypage')}>My Page</ListGroup.Item>
                            <ListGroup.Item action variant='light' onClick = {() => this.SignOutHandler()}>Sign Out</ListGroup.Item>
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
                    <h1 id='AditTitle' align='left' onClick = {() => window.location.assign('/home')}>Adit</h1>
<<<<<<< Updated upstream
=======
                    <div class="Search">
                        <input id='ad-search-input' type='text' placeHolder='Search' onKeyPress={this.keyPressHandler}onChange={(event) => this.setState({...this.state, searchkey: event.target.value})}/>
                        <FontAwesomeIcon icon = {faSearch} onClick={this.searchConfirmHandler}/>
                        <i className="fa fa-search" id='search-confirm-button' aria-hidden="true" onClick={this.searchConfirmHandler}></i>
                    </div>
                    {this.state.sign_in && newArticleButton}                    
>>>>>>> Stashed changes
                    {this.state.sign_in && overlaytrigger}
                    {!this.state.sign_in && signInButton}
                </Navbar>
            </div>
        )
    }
}

export default TopMenu