import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Preview.css';


class Preview extends Component {
    render() {
        return (
            <div onClick={this.props.clickPreview}>
                <Card className="ArticlePreview">
                    <Card.Header id="PreviewHeader" align="left">
                        {this.props.preview.day.toString() + 'Days Left'}
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Card.Img
                                variant="bottom"
                                src={this.props.preview.thumbnail}
                                id="thumbnail"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <big>
                                <strong>{this.props.preview.title}</strong>
                            </big>
                            <br/>
                            <text>{this.props.preview.subtitle}</text>
                        </ListGroup.Item>
                        <Card.Footer>
                            <small className="text-muted">
                                {this.props.preview.acheive_rate.toString() + '% reached'}
                            </small>
                        </Card.Footer>
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
