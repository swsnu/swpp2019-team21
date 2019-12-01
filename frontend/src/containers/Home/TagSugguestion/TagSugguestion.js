import React from 'react';
import { connect } from 'react-redux';
import { tagActions } from '../../../store/actions/tag.action';
import { Button } from 'react-bootstrap';

class TagSugguestion extends React.Component {
    addTagHandler(name) {
        this.props.onAddTag(name);
    }

    render() {
        const { adpost_items } = this.props;
        var { suggested_tags } = this.props;
        suggested_tags = suggested_tags.filter(
            item => !this.props.user.tags.includes(item.name)
        );

        return (
            <div className="TagSugguestion">
                <h1>How about tags like these?</h1>
                <div className="suggested-tag-list">
                    {suggested_tags.map(item => {
                        return (
                            <Button
                                className="tag-item"
                                key={item.id}
                                onClick={() => this.addTagHandler(item.name)}>
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        suggested_tags: state.tag.suggested_tags,
        user: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetSuggestedTag: () => {
            dispatch(tagActions.getSuggestedTags());
        },
        onAddTag: content => {
            dispatch(tagActions.addTag(content));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagSugguestion);
