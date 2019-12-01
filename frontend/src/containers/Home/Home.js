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
import { tagActions } from '../../store/actions/tag.action';
import { userActions } from '../../store/actions/user.action';
import { Button } from 'react-bootstrap';

const mockEventList = [
    {
        id: 1,
        title: 'Intro First',
        url: intro_first
    },
    {
        id: 2,
        title: 'Intro Second',
        url: intro_second
    },
    {
        id: 3,
        title: 'Intro Third',
        url: intro_third
    }
];

class Home extends Component {
    state = {
        updated: false
    };

    componentDidMount() {
        this.props.onGetHottestList();
        this.props.onGetRecentList();
        this.props.onGetCustomList();
        this.props.onGetSuggestedTag();
    }

    render() {
        const addTagHandler = name => {
            const user = {
                nickname: this.props.user.nickname,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name,
                tags: this.props.user.tags.concat(name)
            };
            this.props.putUser(user);
        };

        const { adpost_items } = this.props;
        var { suggested_tags } = this.props;
        suggested_tags = suggested_tags.filter(
            item => !this.props.user.tags.includes(item.name)
        );

        const suggested_tag_list = (
            <div className="suggested-tag frame">
                <h1>How about a tags like these?</h1>
                <div className="suggested-tag-list">
                    {suggested_tags.map(item => {
                        return (
                            <Button
                                className="tag-item"
                                key={item.id}
                                onClick={() => addTagHandler(item.name)}>
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );

        return (
            <div className="Home">
                <EventItemList eventItems={mockEventList} />
                {suggested_tag_list}
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
        putUser: user => {
            dispatch(userActions.putUser(user));
        }
    };
};

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items,
        suggested_tags: state.tag.suggested_tags,
        user: state.user.user
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
