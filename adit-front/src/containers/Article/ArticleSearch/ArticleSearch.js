import React, { Component } from 'react';
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap';
import ArticlePreview from '../../../components/ArticlePreview/ArticlePreview'
import thumbnail from '../../../assets/thumbnail_example.png'
import './ArticleSearch.css'
import intro_first from '../../../assets/intro_first.jpg'
import intro_second from '../../../assets/intro_second.jpg'
import intro_third from '../../../assets/intro_third.jpg'

class ArticleSearch extends Component {
    render() {
        return(
            <div className="ArticleSearch">
                <Carousel>
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
                <p></p>
                <h1>Recommended</h1>
                <table id="preview-table" align='center'>
                    <tr>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                    </tr>
                    <tr>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ArticleSearch;