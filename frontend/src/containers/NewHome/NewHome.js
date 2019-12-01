import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tagActions, adpostActions } from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import EventItemList from '../../components/EventItemList/EventItemList';
import intro_first from '../../assets/intro_first.jpg';
import intro_second from '../../assets/intro_second.jpg';
import intro_third from '../../assets/intro_third.jpg';
import './NewHome.css';

class NewHome extends Component {
    state = {
        updated: false
    };

    componentDidMount() {
        this.props.onGetHottestList();
        this.props.onGetRecentList();
        this.props.onGetCustomList();
        this.props.onGetRecentTagList();
    }

    render() {
        const { adpost_items } = this.props;
        return (
            <div className="newhome">
                <ol className="recent-tag-list">
                    {this.props.recent_tags &&
                        this.props.recent_tags.map(tags => {
                            return <li className="recent-tag">{tags.name}</li>;
                        })}
                </ol>
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
        onGetRecentTagList: () => {
            dispatch(tagActions.getRecentTag());
        }
    };
};

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items,
        recent_tags: state.tag.all_tags
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewHome)
);
