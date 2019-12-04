import React from 'react';
import PropTypes from 'prop-types';
import Preview from '../Preview/Preview';
import { history } from '../../store';
import 'react-multi-carousel/lib/styles.css';
import './PreviewList.css';
import AOS from 'aos';

class PreviewList extends React.Component {
    clickPreviewHandler = id => {
        history.push(`/article/${id}`);
    };

    clickSearchMoreHandler = () => {
        history.push(
            `/adposts/search/${this.props.query_type}/${this.props.query}`
        );
    };

    render() {
        return (
            <div className="PreviewList" data-aos="fade-up">
                <h3 className="list-title">{this.props.query}</h3>
                <div className="title-under-line"></div>
                {this.props.articles
                    ? this.props.articles.map(item => (
                          <Preview
                              key={item}
                              preview={item}
                              clickPreview={() =>
                                  this.clickPreviewHandler(item.id)
                              }
                          />
                      ))
                    : null}
                <div id="card-more-btn" onClick={this.clickSearchMoreHandler}>
                    <div id="card-more-text">
                        <div id="plus-btn">+</div>
                        <div id="more-text">
                            {this.props.query} 관련 <br />
                            게시글 더 보기
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PreviewList.propTypes = {
    articles: PropTypes.any,
    query: PropTypes.string,
    query_type: PropTypes.string
};

export default PreviewList;
