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
        this.props.onGetCustomList();
        this.props.onGetHottestList();
        this.props.onGetRecentList();
    }

    /*componentDidUpdate() {
        if(this.state.updated === false) {
            this.props.onGetCustomList();
            this.props.onGetHottestList();
            this.props.onGetRecentList();
            this.state.updated = true;
        }
    }*/

    render() {
        return (
            <div className="home">
                <EventItemList eventItems={mockEventList} />
                <div className="home-aggregated-list">
                    {this.props.loaded && (
                        <div>
                            <PreviewList
                                articles={this.props.hotList.adpost_item}
                                list_name={'Hottest'}
                                compact={false}
                            />
                        </div>
                    )}
                    {this.props.loaded && (
                        <div>
                            <PreviewList
                                articles={this.props.recentList.adpost_item}
                                list_name={'Newest'}
                                compact={false}
                            />
                        </div>
                    )}
                    {sessionStorage.getItem('logged_in') === 'true' &&
                        this.props.interestedList &&
                        Object.keys(this.props.interestedList).map(
                            list_name => (
                                <div>
                                    <PreviewList
                                        articles={
                                            this.props.interestedList[list_name]
                                        }
                                        list_name={list_name}
                                        compact={false}
                                    />
                                </div>
                            )
                        )}
                </div>
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
        interestedList: state.adpost.adpost_list_item,
        loaded: state.adpost.loaded
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
