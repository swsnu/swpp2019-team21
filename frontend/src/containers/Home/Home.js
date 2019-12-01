import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { adpostActions } from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';
import './Home.css';
import { Modal, Button } from 'react-bootstrap';
import { tagActions } from '../../store/actions/tag.action';
import { userActions } from '../../store/actions/user.action';

class Home extends Component {
    state = {
        updated: false
    };

    componentDidMount() {
        this.props.onGetRecentTagList();
        this.props.onGetHottestList();
        this.props.onGetRecentList();
        this.props.onGetCustomList();
        this.props.onGetSuggestedTag();
    }

    closeHandler = () => {
        this.setState({...this.state, showModal: false})
    }

    addTagHandler = name => {
        const user = {
            nickname: this.props.user.nickname,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            tags: this.props.user.tags.concat(name),
            avatar: null
        };
        
        this.props.putUser(user);
        this.setState({...this.state, showModal : true})
    };

    render() {


        const { adpost_items } = this.props;
        var { suggested_tags } = this.props;
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
                    {this.props.recent_tags.map(tags => {
                        return <li className="recent-tag">{tags.name}</li>;
                    })}
                </ol>
            </div>
        );

        return (
            <div className="Home">
                <div className="MainDoor">
                    <div className="MainContainer">
                        <h1 id="MainTitle">소문내세요</h1>
                        <p id="MainDesc">당신의 생활 속에서</p>
                    </div>
                    <div className="TagFrame">
                        {this.props.logged_in && suggested_tag_list}
                        {recent_tag_list}
                    </div>
                </div>
                <Modal className='modal'
                    show={this.state.showModal}
                    onHide={this.closeHandler}>
                    <Modal.Body>
                        추가되었습니다!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            id="charge-confirm"
                            variant="primary"
                            onClick={this.closeHandler}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="home-aggregated-list">
                    {Object.keys(adpost_items ? adpost_items : [])
                        .filter(
                            query => query && !adpost_items[query].is_loading
                        )
                        .map(query => {
                            return (
                                <div key={query}>
                                    <PreviewList
                                        articles={adpost_items[query].list}
                                        query={query}
                                        query_type={
                                            adpost_items[query].query_type
                                        }
                                        compact={false}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCustomList: () => {
            dispatch(adpostActions.getCustomList());
        },
        onGetHottestList: () => {
            dispatch(adpostActions.getAdpostList('hottest', 'special'));
        },
        onGetRecentList: () => {
            dispatch(adpostActions.getAdpostList('recent', 'special'));
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
        putUser: user => {
            dispatch(userActions.putUser(user));
        }
    };
};

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items,
        suggested_tags: state.tag.suggested_tags,
        recent_tags: state.tag.recent_tags,
        user: state.user.user,
        logged_in: state.user.logged_in
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
