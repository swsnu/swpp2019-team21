import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Preview.css';

class Preview extends Component {
    render() {
        return (
            <div
                className="Preview"
                onClick={this.props.clickPreview}
                key={this.props.key}>
                <Card className="ArticlePreview">
                    <Card.Img
                        variant="top"
                        src={this.props.preview.thumbnail}
                        id="thumbnail"
                    />
                    <Card.Body>
                        <Card.Title id="card-title">
                            {this.props.preview.title}
                        </Card.Title>
                        <Card.Text id="card-text">
                            {this.props.preview.subtitle}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {'Until ' +
                                this.props.preview.expiry_date.toString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted">
                                {(
                                    Math.floor(
                                        (this.props.preview.total_views /
                                            this.props.preview.target_views) *
                                            10000
                                    ) / 100
                                ).toString() + '% reached'}
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
