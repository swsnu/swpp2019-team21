import React from 'react';
import Preview from '../Preview/Preview';
import PropTypes from 'prop-types';
import { history } from '../../store';
import './PreviewGrid.css';

class PreviewGrid extends React.Component {
    clickPreviewHandler = id => {
        history.push('/article/' + id);
    };

    render() {
        return (
            <div className="PreviewGrid">
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
            </div>
        );
    }
}

PreviewGrid.propTypes = {
    articles: PropTypes.any
};

export default PreviewGrid;
