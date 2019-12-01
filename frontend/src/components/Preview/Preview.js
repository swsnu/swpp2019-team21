import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Preview.css';

class Preview extends Component {
    render() {
        const {
            thumbnail,
            title,
            subtitle,
            expiry_date,
            total_views,
            target_views
        } = this.props.preview;

        return (
            <div className="Preview" onClick={this.props.clickPreview}>
                <div className="card-photo">
                    <img
                        alt={this.props.preview.thumbnail}
                        src={this.props.preview.thumbnail}
                    />
                </div>
                <div className="card-desc">
                    <h2 className="card-title">{this.props.preview.title}</h2>
                    <div className="card-region-duedate">
                        {'Until ' + this.props.preview.expiry_date.toString()}
                    </div>
                    <div className="card-region-rate">
                        {(
                            Math.floor(
                                (this.props.preview.total_views /
                                    this.props.preview.target_views) *
                                    10000
                            ) / 100
                        ).toString() + '% reached'}
                    </div>
                    <div className="card-counts">현 참여자 50명!</div>
                </div>
            </div>
        );
    }
}

Preview.propTypes = {
    preview: PropTypes.object,
    clickPreview: PropTypes.func
};

export default Preview;
