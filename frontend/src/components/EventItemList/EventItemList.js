import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import './EventItemList.css';

class EventItemList extends React.Component {
    clickEventHandler = id => {
        alert('EVENT ID: ' + id);
    };

    render() {
        return (
            <Carousel className="EventItemList">
                {this.props.eventItems.map(item => (
                    <Carousel.Item
                        className="EventItemListItem"
                        key={item.id}
                        onClick={() => this.clickEventHandler(item.id)}>
                        <img src={item.url} alt={item.title} width="100%" />
                    </Carousel.Item>
                ))}
            </Carousel>
        );
    }
}

EventItemList.propTypes = {
    eventItems: PropTypes.array
};

export default EventItemList;
