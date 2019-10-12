import React, { Component } from 'react';
import ArticlePreview from '../../../components/ArticlePreview/ArticlePreview'
import thumbnail from '../../../assets/thumbnail_example.png'
import './ArticleSearch.css'
class ArticleSearch extends Component {
    render() {
        return(
            <div className="ArticleSearch">
                <h1>Recommended</h1>
                <table id="preview-table" align='center'>
                    <tr>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                        <td><ArticlePreview day={20} thumbnail={thumbnail} title="Adit" subtitle="all new ad platform" percent={77}/></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ArticleSearch;