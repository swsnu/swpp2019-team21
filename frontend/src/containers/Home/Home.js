import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { adpostActions } from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import TagSugguestion from './TagSugguestion/TagSugguestion';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';
import './Home.css';
import { tagActions } from '../../store/actions/tag.action';

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
        this.props.onGetHomeList();
        this.props.onGetSuggestedTag();
    }

    render() {
        const { adpost_home_list } = this.props;

        const adpost_aggregated_list = (
            <div className="home-aggregated-list">
                {adpost_home_list &&
                    adpost_home_list.map(item => {
                        return (
                            <div key={item.query}>
                                <PreviewList
                                    articles={item.data}
                                    query={item.query}
                                    query_type={item.query_type}
                                    compact={false}
                                />
                            </div>
                        );
                    })}
            </div>
        );

        return (
            <div className="Home">
                <EventItemList eventItems={mockEventList} />
                {this.props.logged_in && <TagSugguestion />}
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
        }
    };
};

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items,
        adpost_home_list: state.adpost.adpost_home_list,
        logged_in: state.user.logged_in
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
