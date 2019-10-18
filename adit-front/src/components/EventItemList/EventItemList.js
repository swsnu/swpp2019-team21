import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import './EventItemList.css';

class EventItemList extends React.Component {

    clickEventHandler = id => {
        alert("EVENT ID: " + id);
    };

    render() {
        return (
            <Carousel>
                {this.props.eventItems.map(item =>
                    <Carousel.Item onClick={() => this.clickEventHandler(item.id)}>
                        <img
                            src={item.url}
                            alt={item.title}
                            width="100%"
                        />
                        <Carousel.Caption>
                            <h3>{item.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        );
    }
}

EventItemList.propTypes = {
    eventItems: PropTypes.object
};

export default EventItemList;
