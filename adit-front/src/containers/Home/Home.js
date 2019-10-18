import React, { Component } from 'react';
import {
    Dropdown,
    DropdownButton,
    Navbar,
    Image,
    OverlayTrigger,
    Popover,
    ListGroup,
    ListGroupItem,
    Carousel
} from 'react-bootstrap';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import thumbnail from '../../assets/thumbnail_example.png';
import './Home.css';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';

const mockAdPostList = [...Array(10).keys()].map(index => {
    return {
        id: index,
        day: 20,
        thumbnail: thumbnail,
        title: 'Mocked Title ' + index.toString(),
        subtitle: 'Mocked SubTitle ' + index.toString(),
        acheive_rate: 77
    };
});

const mockEventList = [
    {
        id: 1,
        title: 'Intro First',
        url: intro_first
    },
    {
        id: 2,
        title: 'Intro Second',
        url: intro_second
    },
    {
        id: 3,
        title: 'Intro Third',
        url: intro_third
    }
];

class Home extends Component {
    render() {
        return (
            <div className="home">
                <EventItemList eventItems={mockEventList} />
                <p></p>
                <PreviewList articles={mockAdPostList} list_name={'Hottest'} />
                <PreviewList articles={mockAdPostList} list_name={'Newest'} />
                <PreviewList articles={mockAdPostList} list_name={'Tag 1'} />
            </div>
        );
    }
}

export default Home;
