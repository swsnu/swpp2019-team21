import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem, Carousel} from 'react-bootstrap';
import { connect } from 'net';
import intro_first from '../../../assets/intro_first.jpg'
import intro_second from '../../../assets/intro_second.jpg'
import intro_third from '../../../assets/intro_third.jpg'


class SignUp extends Component {
    state = {email: '', password: '', password_check:'', fname:'', lname:'',}
    
    render(){
        return(
            <div className = "ArticleDetail">
                <Carousel id = "post-picture-view">
                        <Carousel.Item>
                            <img className="intro_first" src = {intro_first} alt='first_slide' width='100%'/>
                            <Carousel.Caption><h3>Intro_First</h3></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_second" src = {intro_second} alt='second_slide' width='100%'/>
                            <Carousel.Caption><h3>Intro_Second</h3></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_third" src = {intro_third} alt='third_slide' width='100%'/>
                            <Carousel.Caption><h3>Intro_Third</h3></Carousel.Caption>
                        </Carousel.Item>
                </Carousel>
                <Image id = "statistics-image" src = {intro_second}/>
                <h2 id = 'post-title-text'>Sample Title</h2>
                <ul id = 'tag-link-list'>
                    <li id = 'tag-link'>Sample tag 1</li>
                    <li id = 'tag-link'>Sample tag 2</li>
                    <li id = 'tag-link'>Sample tag 3</li>
                </ul>

            </div>
        )
    }
}

export default SignUp