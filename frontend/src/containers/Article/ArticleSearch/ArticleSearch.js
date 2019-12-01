import React, { Component } from 'react';
import PreviewGrid from '../../../components/PreviewGrid/PreviewGrid';
import './ArticleSearch.css';
import { adpostActions } from '../../../store/actions/adpost.action';
import { connect } from 'react-redux';

class ArticleSearch extends Component {
    componentDidMount() {
        var { query_type, query } = this.props.match.params;
        this.props.onSearchArticle(query, query_type);
    }

    render() {
        var { query } = this.props.match.params;
        var { adpost_items } = this.props;
        return (
            <div className="ArticleSearch">
                <h3 className="search-query">Search by {query}</h3>
                <div className="title-under-line" />
                {adpost_items[query] && !adpost_items[query].is_loading && (
                    <PreviewGrid articles={adpost_items[query].list} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        adpost_items: state.adpost.adpost_items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchArticle: (query, query_type) =>
            dispatch(adpostActions.getAdpostList(query, query_type))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleSearch);
