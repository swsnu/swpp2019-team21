import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { adpostActions } from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import TagSugguestion from './TagSugguestion/TagSugguestion';
import { history } from '../../store';
import './Home.css';
import { Modal, Button } from 'react-bootstrap';
import { tagActions } from '../../store/actions/tag.action';
import { userActions } from '../../store/actions/user.action';
import AOS from 'aos';

class Home extends Component {
    state = {
        updated: false
    };

    componentDidMount() {
        this.props.onGetHomeList();
        this.props.onGetSuggestedTag();
        this.props.onGetRecentTagList();
        AOS.init({ duration: 500 });
    }

    closeHandler = () => {
        this.setState({ ...this.state, showModal: false });
    };

    addTagHandler = name => {
        this.props.addTag(name);
        this.setState({ ...this.state, showModal: true });
    };

    render() {
        var { adpost_home_list } = this.props;
        adpost_home_list = adpost_home_list.slice(0, 5);
        var { suggested_tags } = this.props;

        const adpost_aggregated_list = (
            <div className="home-aggregated-list">
                {adpost_home_list &&
                    adpost_home_list.map(item => {
                        return (
                            <div key={item.query}>
                                <PreviewList
                                    articles={item.data.slice(0, 7)}
                                    query={item.query}
                                    query_type={item.query_type}
                                    compact={false}
                                />
                            </div>
                        );
                    })}
            </div>
        );

        suggested_tags = suggested_tags.filter(
            item => !this.props.user.tags.includes(item.name)
        );

        const suggested_tag_list = (
            <div className="suggested-tag-frame">
                <h2 id="TagSuggestTitle">이런 주제는 어떠세요?</h2>
                <div className="suggested-tag-list">
                    {suggested_tags.map(item => {
                        return (
                            <Button
                                className="tag-item"
                                key={item.id}
                                onClick={() => this.addTagHandler(item.name)}>
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );

        const recent_tag_list = (
            <div className="recent-tag-frame">
                <h2 id="TagRecentTitle">이런 주제가 인기있어요</h2>
                <ol className="recent-tag-list">
                    {this.props.recent_tags.map((tags, index) => {
                        return (
                            <li
                                id="recent-tag"
                                key={index}
                                onClick={() =>
                                    history.push(
                                        `/adposts/search/tag/${tags.name}`
                                    )
                                }>
                                {tags.name}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );

        return (
            <div className="Home">
                <div className="MainDoor">
                    <div className="MainContainer">
                        <h1 id="MainTitle" data-aos="zoom-in">
                            소문내세요
                        </h1>
                        <p id="MainDesc" data-aos="zoom-in">
                            당신의 일상 속에서
                        </p>
                    </div>
                    <div className="TagFrame" data-aos="fade-up">
                        {this.props.logged_in && suggested_tag_list}
                        {recent_tag_list}
                    </div>
                </div>
                <Modal
                    className="modal"
                    show={this.state.showModal}
                    onHide={this.closeHandler}>
                    <Modal.Body>추가되었습니다!</Modal.Body>
                    <Modal.Footer>
                        <Button
                            id="charge-confirm"
                            variant="primary"
                            onClick={this.closeHandler}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {adpost_aggregated_list}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetHomeList: () => {
            dispatch(adpostActions.getHomeAdpostList());
        },
        onGetSuggestedTag: () => {
            dispatch(tagActions.getSuggestedTags());
        },
        onGetRecentTagList: () => {
            dispatch(tagActions.getRecentTag());
        },
        getUser: user => {
            dispatch(userActions.getUser(user));
        },
        addTag: name => {
            dispatch(tagActions.addTag(name));
        }
    };
};

const mapStateToProps = state => {
    return {
        suggested_tags: state.tag.suggested_tags,
        recent_tags: state.tag.recent_tags,
        user: state.user.user,
        adpost_home_list: state.adpost.adpost_home_list,
        logged_in: state.user.logged_in
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
