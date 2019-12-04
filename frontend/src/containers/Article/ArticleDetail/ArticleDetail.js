import React, { Component } from 'react';
import { ProgressBar, Spinner, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAd, faLink } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { adpostActions, adreceptionActions } from '../../../store/actions';
import { LineChart, XAxis, YAxis, Line, Legend } from 'recharts';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon
} from 'react-share';
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

    postEditHandler = () => {
        this.props.history.push(`/article/${this.props.match.params.id}/edit`);
    };

    tagClickHandler = tagname => {
        this.props.history.push(`/adposts/search/tag/${tagname}`);
    };

    render() {
        var pic = null;

        if (this.props.article) {
            const taglist = this.props.article.tags.map(item => (
                <li
                    onClick={() => this.tagClickHandler(item)}
                    className="tag-items">
                    #{item}
                </li>
            ));
            pic = this.props.article.owner_avatar;
            const tags = <ul id="tag-link">{taglist}</ul>;
            const statData = this.props.article.view_by_date
                .split(', ')
                .map(dat => dat && JSON.parse(dat))
                .slice(0, -1);

            return (
                <div className="ArticleDetail">
                    <section className="article-thumbnail-wrapper section-wrapper">
                        <img
                            id="article-thumbnail"
                            src={this.props.article.thumbnail}
                            alt="first_picture"
                        />
                        <div className="thumbnail-left">
                            <h1 id="post-title-text">
                                {this.props.article.title}
                            </h1>
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
                            {this.props.is_participated && (
                                <div id="share-btn-box">
                                    <div className="facebook-share-btn share-btn">
                                        <FacebookShareButton
                                            url={this.props.unique_link}>
                                            <FacebookIcon
                                                size={40}
                                                borderRadius={5}
                                            />
                                        </FacebookShareButton>
                                    </div>
                                    <div className="twitter-share-btn share-btn">
                                        <TwitterShareButton
                                            url={this.props.unique_link}>
                                            <TwitterIcon
                                                size={40}
                                                borderRadius={5}
                                            />
                                        </TwitterShareButton>
                                    </div>
                                    <div className="url-link share-btn">
                                        <CopyToClipboard
                                            text={this.props.unique_link}>
                                            <div id="url-copy-button">
                                                <FontAwesomeIcon
                                                    icon={faLink}
                                                    size="1x"
                                                />
                                            </div>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            )}
                            {this.props.is_owner ? (
                                <button
                                    className="btn btn-primary"
                                    id="post-edit-button"
                                    onClick={this.postEditHandler}>
                                    Edit
                                </button>
                            ) : (
                                <Button
                                    id="button-submit"
                                    variant="danger"
                                    disabled={this.props.is_participated}
                                    onClick={this.participateHandler}>
                                    참여하기
                                </Button>
                            )}
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
                                <a href={this.props.article.ad_link}>
                                    {this.props.article.ad_link &&
                                    this.props.article.ad_link.length > 40
                                        ? this.props.article.ad_link.substr(
                                              0,
                                              40
                                          ) + '...'
                                        : this.props.article.ad_link}
                                </a>
                            </h3>
                        </div>
                        <p id="description-text">
                            {this.props.article.content}
                        </p>
                        <div className="achieve-bar-component">
                            <h4 id="achieve-bar-name">Achieve Rate</h4>
                            <ProgressBar
                                id="achieve-bar"
                                variant="danger"
                                now={
                                    (this.props.article.total_views /
                                        this.props.article.target_views) *
                                    100
                                }
                                label={`${Math.floor(
                                    (this.props.article.total_views /
                                        this.props.article.target_views) *
                                        10000
                                ) / 100}%`}></ProgressBar>
                        </div>
                    </section>
                    {!this.props.article.is_owner &&
                        this.props.is_participated && (
                            <section className="article-info-participate section-wrapper">
                                <div className="user-earn-view">
                                    <h2 id="earn-text">
                                        Earned points for participant
                                    </h2>
                                    <p id="earn-subtext">
                                        광고 홍보를 통해 번 포인트를 알려줍니다.
                                    </p>
                                    <div id="earn-point">
                                        You promote {this.props.views} views of
                                        people!
                                        <br />
                                        You earned {this.props.views * 7} points
                                    </div>
                                </div>
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
                            </section>
                        )}
                    {this.props.article.is_owner && (
                        <section className="article-info-owner section-wrapper">
                            <div className="stat">
                                <h2 id="stat-text">Statistic for owner</h2>
                                <p id="stat-subtext">
                                    광고 노출 수 변화를 보여줍니다.
                                </p>
                                {statData.length > 2 ? (
                                    <LineChart
                                        width={350}
                                        height={300}
                                        data={statData}>
                                        <XAxis
                                            dataKey="date"
                                            interval="preserveEnd"
                                        />
                                        <YAxis interval="preserveEnd" />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="view"
                                            stroke="#fa4252"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                ) : (
                                    <h2 id="no-stat">
                                        아직 통계가<p></p>제공되지 않습니다
                                    </h2>
                                )}
                            </div>
                            {/* <button
                                className="btn btn-primary"
                                id="post-edit-button"
                                onClick={this.postEditHandler}>
                                Edit
                            </button> */}
                        </section>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <Spinner
                        animation="border"
                        id="redirecting_spinner"
                        variant="danger"
                    />
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
