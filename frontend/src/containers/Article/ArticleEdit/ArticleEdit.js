import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adpostActions } from '../../../store/actions/adpost.action';
import intro_first from '../../../assets/intro_first.jpg';
import './ArticleEdit.css';

class ArticleEdit extends Component {
    state = {
        is_loadcomplete: false,
        title: '',
        subtitle: '',
        duedate: '',
        content: '',
        id: 1,
        thumbnail: intro_first,
        imageURL: intro_first,
        valid: false,
        postUrl: null,
        postFile: null,
        imageChanged: false,
        postTag: [{ id: 1, name: 'iluvswpp' }],
        mockSuggestion: [
            { id: 3, name: 'Bananas' },
            { id: 4, name: 'Mango' },
            { id: 5, name: 'Lemons' },
            { id: 6, name: 'Apricots' }
        ]
    }; // should be props, not state

    componentDidMount() {
        // this.props.ongetArticle(this.props.match.params.id);
    }

    titleChangeHandler = t => {
        if (t.target.value.length <= 30) {
            this.setState({
                ...this.state,
                title: t.target.value
            });
        } else {
            alert('The title cannot be longer than 30 characters');
        }
    };

    subtitleChangeHandler = s => {
        if (s.target.value.length <= 30) {
            this.setState({
                ...this.state,
                subtitle: s.target.value
            });
        } else {
            alert('The subtitle cannot be longer than 30 characters');
        }
    };

    detailedChangeHandler = d => {
        if (d.target.value.length <= 10000) {
            this.setState({
                ...this.state,
                content: d.target.value
            });
        } else {
            alert('Content cannot be longer than 10000 characters');
        }
    };

    imageOnChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                thumbnail: file,
                imageURL: reader.result,
                imageChanged: true
            });
        };

        reader.readAsDataURL(file);
    };

    editConfirmHandler = () => {
        if (!this.state.title) {
            alert('Title should not be empty');
            return;
        }
        if (!this.state.subtitle) {
            alert('Subtitle should not be empty');
            return;
        }
        if (!this.state.content) {
            alert('Content should not be empty');
            return;
        }
        if (!this.state.postUrl) {
            alert('Ad url should not be empty');
            return;
        }
        if (
            this.state.postUrl.toString().length < 9 ||
            (this.state.postUrl.toString().substring(0, 7) !== 'http://' &&
                this.state.postUrl.toString().substring(0, 8) !== 'https://')
        ) {
            alert('Ad url should start with http:// or https://');
            return;
        }
        if (!this.state.imageURL) {
            alert('You should upload image');
            return;
        }
        if (this.state.postFile) {
            if (this.state.postFile.size > 1000000) {
                alert('The file cannot be bigger than 1MB');
                return;
            }
            if (!this.state.postFile.name.match(/.(jpg|jpeg|png)$/i)) {
                alert('You should upload image file');
                return;
            }
        }
        const adpost = {
            title: this.state.title,
            subtitle: this.state.subtitle,
            content: this.state.content,
            image: this.imageCHanged
                ? [this.state.imagePreviewUrl]
                : 'not_changed',
            ad_link: this.state.postUrl,
            tags: this.props.article.tags
        };
        this.props.onputArticle(this.props.match.params.id, adpost);
    };

    render() {
        let imagePreview = null;
        let imageURL = this.state.imageURL;

        if (imageURL) {
            imagePreview = <img id="post-thumbnail-preview" src={imageURL} />;
        }

        if (!this.state.is_loadcomplete && this.props.loaded) {
            this.setState({
                ...this.state,
                title: this.props.article.title,
                subtitle: this.props.article.subtitle,
                content: this.props.article.content,
                imagePreviewUrl: this.props.article.thumbnail,
                postUrl: this.props.article.ad_link,
                is_loadcomplete: true
            });
        }

        return (
            <div>
                {this.props.loaded && (
                    <div className="ArticleEdit">
                        <div className="edit-article-box">
                            <h1>Edit Article</h1>
                        </div>
                        <div className="configuration">
                            <div className="form-group" align="center">
                                <h3 className="form-label">Title</h3>
                                <input
                                    className="form-control"
                                    placeholder=" input title"
                                    id="post-title-input"
                                    onChange={this.titleChangeHandler}
                                    defaultValue={this.props.article.title}
                                    value={this.state.postTitle}
                                />
                            </div>
                            <p />
                            <br />
                            <div className="form-group" align="center">
                                <h3 className="form-label">Subtitle</h3>
                                <input
                                    className="form-control"
                                    placeholder=" input subtitle"
                                    id="post-subtitle-input"
                                    onChange={this.subtitleChangeHandler}
                                    defaultValue={this.props.article.subtitle}
                                    value={this.state.postSubtitle}></input>
                            </div>
                            <p />
                            <br />
                            <div className="form-group" align="center">
                                <h3 className="form-label">Ad Description</h3>
                                <textarea
                                    className="form-control"
                                    placeholder=" explain your ad"
                                    id="post-explain-input"
                                    onChange={this.detailedChangeHandler}
                                    value={this.state.content}></textarea>
                            </div>
                            <p />
                            <br />
                            <div className="form-group" align="center">
                                <h3 className="form-label">Select Thumbnail</h3>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="post-thumbnail-input"
                                    multiple={false}
                                    onChange={this.imageOnChange}
                                />
                                <div>{imageURL}</div>
                            </div>
                            <p />
                            <br />
                            <button
                                className="btn btn-primary"
                                id="next-button"
                                onClick={this.editConfirmHandler}>
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ongetArticle: id => dispatch(adpostActions.getAdpost(id)),
        onputArticle: (id, adpost) =>
            dispatch(adpostActions.putAdpost(id, adpost))
    };
};

const mapStateToProps = state => {
    return {
        loaded: !state.adpost.adpost_detailed_item.is_loading,
        article: state.adpost.adpost_detailed_item
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
