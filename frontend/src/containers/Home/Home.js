import React, { Component } from 'react';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import thumbnail from '../../assets/thumbnail_example.png';
import { adpostActions } from '../../store/actions';
import './Home.css';
import { connect } from 'react-redux';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';
import { withRouter } from 'react-router-dom';

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
    }

    render() {
        const { adpost_items } = this.props;
        return (
            <div className="home">
                <EventItemList eventItems={mockEventList} />
                <div className="home-aggregated-list">
                    {Object.keys(adpost_items)
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
        }
    };
};

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
