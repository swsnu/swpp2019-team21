import React, { Component } from 'react';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import thumbnail from '../../assets/thumbnail_example.png';
import * as actionCreators from '../../store/actions/adpost.action';
import './Home.css';
import { connect } from 'react-redux';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';
import { findRepos } from 'jest-changed-files';

const mockAdPostList = [...Array(10).keys()].map(index => {
    return {
        id: index,
        day: 20,
        thumbnail: thumbnail,
        title: 'Mocked Title ' + index.toString(),
        subtitle: 'Mocked SubTitle ' + index.toString(),
        acheive_rate: 77
    };
});

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
    componentDidMount() {
        this.props.onGetCustomList();
        this.props.onGetHottestList();
        this.props.onGetRecentList();
    }

    render() {
        var customPreviewList;
        /*if(this.props.loaded) {
                customPreviewList = this.props.interestedList.map(list => {
                return (
                    <PreviewList
                        articles={list.adpost_item}
                        list_name={list.list_tag}
                    />
                );
            });
        }*/
        return (
            <div className="home">
                <EventItemList eventItems={mockEventList} />
                {this.props.loaded && customPreviewList}
                <p></p>
                {this.props.loaded && (
                    <div>
                        <PreviewList
                            articles={this.props.hotList.adpost_item}
                            list_name={'Hottest'}
                            compact = {false}
                        />
                    </div>
                )}
                {this.props.loaded && (
                    <div>
                        <PreviewList
                            articles={this.props.recentList.adpost_item}
                            list_name={'Newest'}
                            compact = {false}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetRecentList: () => {
            dispatch(actionCreators.getRecentList());
        },
        onGetHottestList: () => {
            dispatch(actionCreators.getHottestList());
        },
        onGetCustomList: () => {
            dispatch(actionCreators.getCustomList());
        },
        onGetListByTags: tag_list => {
            dispatch(actionCreators.getArticleList(tag_list));
        }
    };
};

const mapStateToProps = state => {
    return {
        hotList: state.adpost.adpost_hottest_item,
        recentList: state.adpost.adpost_recent_item,
        interestedList: state.adpost.addpost_list_item,
        loaded: state.adpost.loaded
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
