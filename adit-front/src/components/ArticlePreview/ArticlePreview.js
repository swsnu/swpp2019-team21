import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import './ArticlePreview.css'
class ArticlePreview extends Component {
    render() {
        return(
            <Card className="ArticlePreview">
                <Card.Header id="PreviewHeader" align = 'left'>{this.props.day.toString()+'Days Left'}</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item><Card.Img variant="bottom" src={this.props.thumbnail} id="thumbnail"/></ListGroup.Item>
                <ListGroup.Item>
                    <big><strong>{this.props.title}</strong></big><p/>
                    <text>{this.props.subtitle}</text>
                </ListGroup.Item>
                <Card.Footer><small className="text-muted">{this.props.percent.toString()+'% reached'}</small></Card.Footer>
                </ListGroup>
            </Card>
        );
    }
}

export default ArticlePreview;