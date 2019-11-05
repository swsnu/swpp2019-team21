import React from 'react';
import Preview from '../Preview/Preview';
import PropTypes from 'prop-types';

class PreviewGrid extends React.Component {
    sliceArray(arr, chunk) {
        var ret = [];
        var i;
        var row;
        for (i = 0; i < arr.length; i += chunk) {
            row = arr.slice(i, i + chunk);
            ret.push(row);
        }
        return ret;
    }

    clickPreviewHandler = id => {};

    render() {
        return (
            <div>
                <table id="preview-table" align="center">
                    {this.sliceArray(this.props.articles, 4).map(row => (
                        <tr>
                            {row.map(item => (
                                <td>
                                    <Preview
                                        key={item.id}
                                        preview={item}
                                        clickPreview={() =>
                                            this.clickPreviewHandler(item.id)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

PreviewGrid.propTypes = {
    articles: PropTypes.any
};

export default PreviewGrid;
