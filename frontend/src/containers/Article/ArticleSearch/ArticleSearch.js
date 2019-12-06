import React, { Component } from 'react';
import PreviewGrid from '../../../components/PreviewGrid/PreviewGrid';
import './ArticleSearch.css';
import { adpostActions } from '../../../store/actions/adpost.action';
import { connect } from 'react-redux';
import AOS from 'aos';

class ArticleSearch extends Component {
    componentDidMount() {
        let { query_type, query } = this.props.match.params;
        this.props.onSearchArticle(query, query_type);
        AOS.init({ duration: 500 });
    }

    render() {
        let { query } = this.props.match.params;
        let { adpost_items } = this.props;
        return (
            <div className="ArticleSearch" data-aos="fade-up">
                <h3 className="search-query">Search by {query}</h3>
                <div className="title-under-line" />
                {adpost_items.data && (
                    <PreviewGrid articles={adpost_items.data} />
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
            dispatch(
                adpostActions.getAdpostList(query.toLowerCase(), query_type)
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleSearch);
