import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import Preview from '../Preview/Preview';
import { history } from '../../store';
import 'react-multi-carousel/lib/styles.css';
import './PreviewList.css';
import { Route, Link } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const responsive_compact = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

class PreviewList extends React.Component {
    clickPreviewHandler = id => {
        //alert('PREVIEW ID:' + id);
        history.push('/article/' + id);
    };

    render() {
        return (
            <div className="PreviewList">
                <h1 id="list-title">{this.props.list_name}</h1>
                <Carousel
                    id="list-carousel"
                    responsive={
                        this.props.compact ? responsive_compact : responsive
                    }>
                    {this.props.articles && this.props.articles.map(item => (
                        <Preview
                            key={item.id}
                            preview={item}
                            clickPreview={() =>
                                this.clickPreviewHandler(item.id)
                            }
                        />
                    ))}
                    <Link to={`/search/${this.props.list_name}`}>
                        <button
                            id="search-more"
                            onClick={this.clickSearchMoreHandler}>
                            Search More!
                        </button>
                    </Link>
                </Carousel>
            </div>
        );
    }
}

PreviewList.propTypes = {
    articles: PropTypes.any,
    list_name: PropTypes.string
};

export default PreviewList;
