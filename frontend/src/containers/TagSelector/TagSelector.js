import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import './TagSelector.css';
import { tagActions } from '../../store/actions';
import { withRouter } from 'react-router-dom';

class TagSelector extends Component {
    state = { value: '', content: '' };

    handleInputChange = newValue => {
        const inputValue = newValue;
        this.setState({ ...inputValue });
        return inputValue;
    };

    handleSubmit = event => {
        if (this.state.value && event.key === 'Enter') {
            window.location.assign(
                `/adposts/search/${'tag'}/${this.state.value}`
            );
            this.setState({ value: '', content: '' });
        }
    };

    filterTags = (inputValue, data) => {
        var tmp = data
            .filter(i => {
                return i.content
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
            })
            .map(i => {
                return { value: i.content, label: i.content };
            })
            .slice(0, 10);
        return tmp;
    };

    loadOptions = (inputValue, callback) => {
        axios.get('/api/tag/').then(response => {
            callback(this.filterTags(inputValue, response.data));
        });
    };

    render() {
        return (
            <div id="tag-selector">
                <AsyncSelect
                    cacheOptions
                    loadOptions={this.loadOptions}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleSubmit}
                    noOptionsMessage={() => {
                        return '해당하는 태그가 없습니다';
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allTags: state.tag.all_tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTag: tagActions.getAllTag()
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TagSelector)
);
