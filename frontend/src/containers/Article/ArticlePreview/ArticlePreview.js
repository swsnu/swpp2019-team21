import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ArticlePreview.css';

var multiplier = 7;

class ArticlePreview extends Component {
    render() {
        const taglist = this.props.article.tags.reduce((acc, cur, i) => {
            return acc + '#' + cur + ' ';
        }, '');
        const tags = <p id="tag-link">{taglist}</p>;
        return (
            <div className="PreviewForCreate">
                <div className="upper-component">
                    <div className="left-component">
                        <img
                            id="article-thumbnail"
                            src={this.props.article.thumbnail}
                            alt="first_picture"
                            width="90%"
                            height="400px"
                        />
                    </div>
                    <div className="right-component">
                        <h1 id="post-title-text">{this.props.article.title}</h1>
                        <h2 id="post-subtitle-text">
                            {this.props.article.subtitle}
                        </h2>
                        {tags}
                        <h3 id="ad-link-title">AD link</h3>
                        <a href={this.props.article.ad_link}>
                            <h2 id="ad-link-text">
                                {this.props.article.ad_link}
                            </h2>
                        </a>
                        <h3 id="due-date-title">Due Date</h3>
                        <h3 id="due-date-text">
                            {this.props.article.expiry_date}
                        </h3>
                        <div>
                            <div>
                                {/*<button
                                        id="post-edit-button"
                                        onClick={this.postEditHandler}>
                                        Edit
                                    </button>*/}
                                <div className="achieve-bar-component">
                                    <h4 id="achieve-bar-name">Achieve Rate</h4>
                                    <ProgressBar
                                        id="achieve-bar"
                                        now={50}
                                        label={`${50}%`}></ProgressBar>
                                </div>
                            </div>
                            {!this.props.article.is_owner &&
                                /*!this.props.article.info_aditee.is_participating*/

                                this.props.is_participated && (
                                    <div className="url-component">
                                        <p id="unique-url-text">
                                            {this.props.unique_link}
                                        </p>
                                        <CopyToClipboard
                                            text={this.props.unique_link}>
                                            <button
                                                id="url-copy-button"
                                                className="btn btn-primary"
                                                disabled={true}>
                                                Copy
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                )}
                            <div></div>
                            {!this.props.article.is_owner &&
                                this.props.is_participated && (
                                    <div className="earn-point">
                                        <h2 id="earn-point-text">
                                            You Earned
                                            <h2 id="point-number">
                                                {this.props.views * multiplier}
                                            </h2>
                                            Points!
                                            {console.log(this.props.views)}
                                            {console.log(this.props)}
                                        </h2>
                                    </div>
                                )}
                            {!this.props.is_participated && (
                                <div className="participate">
                                    <button
                                        className="btn btn-primary"
                                        id="participate-button"
                                        disabled={true}>
                                        Participate
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="down-component">
                    <h3 id="description-title-text">Detailed description</h3>
                    <pre>
                        <p id="description-text">
                            {this.props.article.content}
                        </p>
                    </pre>
                </div>
            </div>
        );
    }
}

export default ArticlePreview;
