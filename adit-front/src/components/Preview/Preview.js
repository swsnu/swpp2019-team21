import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Preview.css';

class Preview extends Component {
    render() {
        return (
            <div className="Preview" onClick={this.props.clickPreview}>
                <Card className="ArticlePreview">
                    <Card.Img
                        variant="top"
                        src={this.props.preview.thumbnail}
                        id="thumbnail"
                    />
                    <Card.Body>
                        <Card.Title>{this.props.preview.title}</Card.Title>
                        <Card.Text>{this.props.preview.subtitle}</Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {this.props.preview.day.toString() + 'Days Left'}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted">
                                {this.props.preview.acheive_rate.toString() +
                                    '% reached'}
                            </small>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

Preview.propTypes = {
    preview: PropTypes.object,
    clickPreview: PropTypes.func
};

export default Preview;
