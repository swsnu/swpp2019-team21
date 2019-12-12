import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAd, faLink } from '@fortawesome/free-solid-svg-icons';
import profile from '../../../assets/avatar.png';
import './ArticlePreview.css';

class ArticlePreview extends Component {
    render() {
        const taglist = this.props.article.tags.reduce((acc, cur, i) => {
            return acc + '#' + cur + ' ';
        }, '');
        const pic = this.props.article.pic ? this.props.article.pic : profile;
        const tags = <p id="tag-link">{taglist}</p>;
        return (
            <div className="ArticlePreview">
                <section className="article-thumbnail-wrapper section-wrapper">
                    <img
                        id="article-thumbnail"
                        src={this.props.article.thumbnail}
                        alt="first_picture"
                    />
                    <div className="thumbnail-left">
                        <h1 id="post-title-text">{this.props.article.title}</h1>
                        <h2 id="post-subtitle-text">
                            {this.props.article.subtitle}
                        </h2>
                        {tags}
                        <div className="owner-info">
                            <div id="owner-image">
                                <img src={pic} className="Avatar" />
                            </div>
                            <div id="owner-info-text">
                                {this.props.article.owner_nickname}
                            </div>
                        </div>
                    </div>
                    <div className="thumbnail-right">
                        <div>
                            <Button
                                className="right-button-submit"
                                variant="danger"
                                disabled>
                                광고 수정하기
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="article-description-wrapper section-wrapper">
                    <div className="aggregate-info-window">
                        <h3 id="due-date-text">
                            <FontAwesomeIcon icon={faClock} size="1x" />
                            &nbsp;&nbsp;
                            {this.props.article.expiry_date} 마감
                        </h3>
                        <h3 id="target-view-text">
                            <FontAwesomeIcon icon={faAd} size="1x" />
                            &nbsp;&nbsp;목표 광고수{' '}
                            {this.props.article.target_views}회
                        </h3>
                        <h3 id="target-view-text">
                            <FontAwesomeIcon icon={faLink} size="1x" />
                            &nbsp;&nbsp;
                            <a>
                                {this.props.article.ad_link &&
                                this.props.article.ad_link.length > 40
                                    ? this.props.article.ad_link.substr(0, 40) +
                                      '...'
                                    : this.props.article.ad_link}
                            </a>
                        </h3>
                    </div>
                    <p id="description-text">{this.props.article.content}</p>
                    <div className="achieve-bar-component">
                        <h4 id="achieve-bar-name">Achieve Rate</h4>
                        <ProgressBar
                            id="achieve-bar"
                            variant="danger"
                            now={30}
                            label="30%"></ProgressBar>
                    </div>
                </section>
            </div>
        );
    }
}

export default ArticlePreview;
