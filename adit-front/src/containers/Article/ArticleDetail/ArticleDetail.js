import React, { Component, Profiler } from 'react';
import { Image, Carousel, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as actionCreators from '../../../store/actions/adpost.action';
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
        this.props.ongetArticle(window.location.href.substring(29));
    }

    participateHandler = () => {
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
        if(this.props.loaded == true) {
            const tags = this.props.article.tags.map(td => {
                return (
                    <li id="tag-link">
                        {td}
                    </li>
                );
            });
            return (
                <div className="ArticleDetail">
                    <div className="left-component">
                        <img
                            id="article-thumbnail"
                            src={this.props.article.thumbnail}
                            alt="first_picture"
                            width="100%"
                            height="500px"
                        />
                        <h3 id="description-title-text">Detailed description</h3>
                        <p id="description-text">
                            {this.props.article.content}
                        </p>
                    </div>
                    <h1 id="post-title-text">{this.props.article.title}</h1>
                    <h3 id="post-subtitle-text">{this.props.article.subtitle}</h3>
                    <p id="due-date-text">{this.props.article.expiry_date}</p>
                    <ul id="tag-link-list">{tags}</ul>
                    <div>
                        {this.state.is_owner && (
                            <div>
                                <Image
                                    id="statistics-image"
                                    src={statistics_image}
                                />
                                <button
                                    id="post-edit-button"
                                    onClick={this.postEditHandler}>
                                    Edit
                                </button>
                                <div className="achieve-bar-component">
                                    <p id="achieve-bar-name">achieve rate</p>
                                    <ProgressBar
                                        id="achieve-bar"
                                        now={this.state.now}
                                        label={`${this.state.now}%`}></ProgressBar>
                                </div>
                            </div>
                        )}
                        {!this.props.article.is_owner && /*!this.props.article.info_aditee.is_participating*/ this.state.participated && (
                            <div className="url-component">
                                <p id="unique-url-text">{this.props.article.info_aditee.unique_url}</p>
                                <CopyToClipboard text={this.props.article.info_aditee.unique_url}>
                                    <button id="url-copy-button">Copy</button>
                                </CopyToClipboard>
                            </div>
                        )}
                        {!this.props.article.is_owner && /*!this.props.article.info_aditee.is_participating*/ this.state.participated && (
                            <button
                                id="participate-button"
                                onClick={this.participateHandler}>
                                Participate
                            </button>
                        )}
                    </div>
                    <button onClick={this.toggleMine} id="toggle-mine-button">
                        Toggle Mine
                    </button>
                    <button
                        onClick={this.toggleParticipate}
                        id="toggle-participate-button">
                        Toggle Participate
                    </button>
                </div>
            );
        }
        else {
            return(
                <h1>LOADING</h1>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ongetArticle: (id) => dispatch(actionCreators.getAdpost(id))
    };
}

const mapStateToProps = state => {
    return {
        loaded: state.adpost.loaded,
        article: state.adpost.adpost_detailed_item,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
