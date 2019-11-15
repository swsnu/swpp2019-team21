import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { adpostActions, adreceptionActions } from '../../../store/actions';
import './ArticleDetail.css';

var multiplier = 7;

class ArticleDetail extends Component {
    componentDidMount() {
        this.props.ongetArticle(this.props.match.params.id);
        this.props.ongetReception(this.props.match.params.id);
    }

    participateHandler = () => {
        const adpost = {
            adpost: this.props.match.params.id
        };
        this.props.onpostReception(adpost);
        this.setState({ ...this.state, participated: true });
    };

/*    postEditHandler = () => {
        //window.location.assign(window.location.href + '/edit');
        this.props.history.push('/article/1/edit');
    };*/

    render() {
        if (this.props.loaded == true) {
            const taglist = this.props.article.tags.reduce((acc, cur, i) => {
                return acc + '#' + cur + ' ';
            }, '');
            const tags = <p id="tag-link">{taglist}</p>;
            return (
                <div className="ArticleDetail">
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
                            <h1 id="post-title-text">
                                {this.props.article.title}
                            </h1>
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
                                        <h4 id="achieve-bar-name">
                                            Achieve Rate
                                        </h4>
                                        <ProgressBar
                                            id="achieve-bar"
                                            now={
                                                (this.props.article
                                                    .total_views /
                                                    this.props.article
                                                        .target_views) *
                                                100
                                            }
                                            label={`${Math.floor(
                                                (this.props.article
                                                    .total_views /
                                                    this.props.article
                                                        .target_views) *
                                                    10000
                                            ) / 100}%`}></ProgressBar>
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
                                                    className="btn btn-primary">
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
                                                    {this.props.views *
                                                        multiplier}
                                                </h2>
                                                Points!
                                            </h2>
                                        </div>
                                    )}
                                {!this.props.is_participated && (
                                    <div className="participate">
                                        <button
                                            className="btn btn-primary"
                                            id="participate-button"
                                            disabled={
                                                this.props.article.is_owner
                                            }
                                            onClick={this.participateHandler}>
                                            Participate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="down-component">
                        <h3 id="description-title-text">
                            Detailed description
                        </h3>
                        <p id="description-text">
                            {this.props.article.content}
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>LOADING</h1>
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ongetArticle: id => dispatch(adpostActions.getAdpost(id)),
        onpostReception: id => dispatch(adreceptionActions.postReception(id)),
        ongetReception: id => dispatch(adreceptionActions.getReception(id))
    };
};

const mapStateToProps = state => {
    return {
        loaded: !state.adpost.adpost_detailed_item.is_loading,
        article: state.adpost.adpost_detailed_item,
        views: state.adreception.views,
        unique_link: state.adreception.unique_link,
        is_participated: state.adreception.is_participated
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetail);
