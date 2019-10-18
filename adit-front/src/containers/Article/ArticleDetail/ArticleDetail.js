import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem, Carousel, ProgressBar} from 'react-bootstrap';
import { connect } from 'net';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ArticleDetail.css'
import intro_first from '../../../assets/intro_first.jpg'
import intro_second from '../../../assets/intro_second.jpg'
import intro_third from '../../../assets/intro_third.jpg'


class ArticleDetail extends Component {
    state = {mine: false, participated: true, now: 60, url: "https://www.thisisurlbutidontknowwhattowrite.com"} // should be props, not state

    participateHandler = () => {
        this.setState({...this.state, participated : true})
    }

    postEditHandler = () => {
        window.location.assign();
    }
    
    toggleParticipate = () => {
        const tem = !this.state.participated;
        this.setState({...this.state, participated: tem})
    }

    toggleMine = () => {
        const tem = !this.state.mine;
        this.setState({...this.state, mine: tem})
    }
    render(){
        return(
            <div className = "ArticleDetail">
                <Carousel id = "post-picture-view">
                        <Carousel.Item>
                            <img className="intro_first" src = {intro_first} alt='first_picture' width='100%'/>
                            <Carousel.Caption><h3>Intro_First</h3></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_second" src = {intro_second} alt='second_picture' width='100%'/>
                            <Carousel.Caption><h3>Intro_Second</h3></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_third" src = {intro_third} alt='third_picture' width='100%'/>
                            <Carousel.Caption><h3>Intro_Third</h3></Carousel.Caption>
                        </Carousel.Item>
                </Carousel>
                {this.state.mine && 
                    <div>
                        <Image id = "statistics-image" src = {intro_second}/>
                        <button id = 'post-edit-button'>Edit</button>
                        <ProgressBar id = "achieve-bar" now = {this.state.now} label = {`${this.state.now}%`}></ProgressBar>
                    </div>
                }
                <h1 id = 'post-title-text'>Sample Title</h1>
                <ul id = 'tag-link-list'>
                    <li id = 'tag-link'>Sample tag 1</li>
                    <li id = 'tag-link'>Sample tag 2</li>
                    <li id = 'tag-link'>Sample tag 3</li>
                </ul>
                {(!this.state.mine && !this.state.participated) && <button id = 'participate-button' onClick = {this.participateHandler}>Participate</button>}
                {(!this.state.mine && this.state.participated) && 
                    <div className = 'url-component'>
                        <p id = 'unique-url-text'>{this.state.url}</p>
                        <CopyToClipboard text = {this.state.url}>
                            <button id = 'url-copy-button'>Copy</button>  
                        </CopyToClipboard> 
                    </div> 
                }
                <button onClick = {this.toggleMine}>Toggle Mine</button>
                <button onClick = {this.toggleParticipate}>Toggle Participated</button>
            </div>
        )
    }
}

export default ArticleDetail