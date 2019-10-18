import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem, Carousel, ProgressBar} from 'react-bootstrap';
import { connect } from 'net';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ArticleDetail.css'
import intro_first from '../../../assets/intro_first.jpg'
import intro_second from '../../../assets/intro_second.jpg'
import intro_third from '../../../assets/intro_third.jpg'
import statistics_image from '../../../assets/statistics.png'


class ArticleDetail extends Component {
    state = {mine: false, 
        participated: false, 
        now: 60, 
        url: "https://www.thisisurlbutidontknowwhattowrite.com",
        detailedDescription: "Hello, my name is SeoYeongHo and I don't have any thing to write but I have to write a lot of things in order to write something. It should be four lines but it is only two lines, and I want this to be four lines. Therefore, I am writing useless text in order to make this as four lines. Sorry if this code is unreadable, but I have to make this text to be 4 lines",
        title: "Sample title",
        subtitle: "Sample subtitle",
        duedate: "2001/01/16",
        id: 1,

    } // should be props, not state

    participateHandler = () => {
        this.setState({...this.state, participated : true})
    }

    postEditHandler = () => {
        window.location.assign(window.location.href + '/edit');
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
                <h1 id = 'post-title-text'>{this.state.title}</h1>
                <h3 id = 'post-subtitle-text'>{this.state.subtitle}</h3>
                <p id = 'due-date-text'>{this.state.duedate}</p>
                <ul id = 'tag-link-list'>
                    <li id = 'tag-link'>Sample tag 1</li>
                    <li id = 'tag-link'>Sample tag 2</li>
                    <li id = 'tag-link'>Sample tag 3</li>
                </ul>
                <div className = 'description-component'>
                    <h3 id = 'description-title-text'>Detailed description</h3>
                    <p id = 'description-text'>{this.state.detailedDescription}</p>
                </div>
                {this.state.mine && 
                    <div>
                        <Image id = "statistics-image" src = {statistics_image}/>
                        <button id = 'post-edit-button' onClick = {this.postEditHandler}>Edit</button>
                        <div className = 'achieve-bar-component'>
                            <p id = 'achieve-bar-name'>achieve rate</p>
                            <ProgressBar id = "achieve-bar" now = {this.state.now} label = {`${this.state.now}%`}></ProgressBar>
                        </div>
                    </div>
                }
                
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