import React, { Component, Profiler } from 'react';
import { Image, Carousel, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as actionCreators from '../../../store/actions/adpost.action';
import * as receptionCreators from '../../../store/actions/adreception.action';
import './ArticleDetail.css';
import intro_first from '../../../assets/intro_first.jpg';
import intro_second from '../../../assets/intro_second.jpg';
import intro_third from '../../../assets/intro_third.jpg';
import statistics_image from '../../../assets/statistics.png';

class ArticleDetail extends Component {
    state = {
        mine: false,
        participated: false,
        now: 60,
        url: 'https://www.thisisurlbutidontknowwhattowrite.com',
        detailedDescription:
            "Hello, my name is SeoYeongHo and I don't have any thing to write but I have to write a lot of things in order to write something. It should be four lines but it is only two lines, and I want this to be four lines. Therefore, I am writing useless text in order to make this as four lines. Sorry if this code is unreadable, but I have to make this text to be 4 lines",
        title: 'Sample title',
        subtitle: 'Sample subtitle',
        duedate: '2001/01/16',
        thumbnail: intro_first,
        id: 1,
        posttag: [
            { id: 3, name: 'Bananas' },
            { id: 4, name: 'Mango' },
            { id: 5, name: 'Lemons' },
            { id: 6, name: 'Apricots' }
        ]
    }; // should be props, not state

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
        //window.location.assign(window.location.href + '/edit');
        this.props.history.push('/article/1/edit');
    };

    toggleParticipate = () => {
        const tem = !this.state.participated;
        this.setState({ ...this.state, participated: tem });
    };

    toggleMine = () => {
        const tem = !this.state.mine;
        this.setState({ ...this.state, mine: tem });
    };
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
                                {!this.props.is_participated && (
                                    <button
                                        className="btn btn-primary"
                                        id="participate-button"
                                        disabled={this.props.article.is_owner}
                                        onClick={this.participateHandler}>
                                        Participate
                                    </button>
                                )}
                            </div>
                            {/*<button
                                className="btn btn-primary"
                                onClick={this.toggleParticipate}
                                id="toggle-participate-button">
                                Toggle Participate
                            </button>*/}
                        </div>
                    </div>
                    <div className="down-component">
                    <h3 id="description-title-text">Detailed description</h3>
                    <p id="description-text">{this.props.article.content}</p>
                    </div>
                </div>
            );
        } else {
            return <h1>LOADING</h1>;
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ongetArticle: id => dispatch(actionCreators.getAdpost(id)),
        onpostReception: id => dispatch(receptionCreators.postReception(id)),
        ongetReception: id => dispatch(receptionCreators.getReception(id))
    };
};

const mapStateToProps = state => {
    return {
        loaded: state.adpost.loaded,
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
