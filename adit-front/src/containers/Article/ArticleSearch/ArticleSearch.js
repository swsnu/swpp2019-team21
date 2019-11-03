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
import PreviewGrid from '../../../components/PreviewGrid/PreviewGrid';
import thumbnail from '../../../assets/thumbnail_example.png';
import './ArticleSearch.css';
import intro_first from '../../../assets/intro_first.jpg';
import intro_second from '../../../assets/intro_second.jpg';
import intro_third from '../../../assets/intro_third.jpg';

const mockAdPostList = [...Array(30).keys()].map(index => {
    return {
        id: index,
        day: 20,
        thumbnail: thumbnail,
        title: 'Mocked Title ' + index.toString(),
        subtitle: 'Mocked SubTitle ' + index.toString(),
        acheive_rate: 77,
        expiry_date: 10,
        target_views: 10
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

class ArticleSearch extends Component {
    render() {
        return (
            <div className="ArticleSearch">
                <h1>Search by {this.props.match.params.tag}</h1>
                <PreviewGrid articles={mockAdPostList} />
            </div>
        );
    }
}

export default ArticleSearch;
