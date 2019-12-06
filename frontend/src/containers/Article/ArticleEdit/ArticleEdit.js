import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adpostActions } from '../../../store/actions/adpost.action';
import intro_first from '../../../assets/intro_first.jpg';
import './ArticleEdit.css';

class ArticleEdit extends Component {
    state = {
        is_loadcomplete: false,
        imageChanged: false,
        new_thumbnail: null,
        new_imageURL: null,
        article: {
            title: null,
            subtitle: null,
            content: null,
            thumbnail: null,
            image: [],
            tags: [],
            is_owner: false,
            open_for_all: false
        }
    }; // should be props, not state

    componentDidMount() {
        this.props.ongetArticle(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (!this.state.is_loadcomplete && this.props.article) {
            this.setState({
                ...this.state,
                article: this.props.article,
                is_loadcomplete: true
            });
            /*if (!this.state.article.is_owner) {
                this.props.history.push('/home');
            }*/
        }
    }

    titleChangeHandler = t => {
        if (t.target.value.length <= 30) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    title: t.target.value
                }
            });
        } else {
            alert('The title cannot be longer than 30 characters');
        }
    };

    subtitleChangeHandler = s => {
        if (s.target.value.length <= 30) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    subtitle: s.target.value
                }
            });
        } else {
            alert('The subtitle cannot be longer than 30 characters');
        }
    };

    detailedChangeHandler = d => {
        if (d.target.value.length <= 10000) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    content: d.target.value
                }
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
                ...this.state,
                new_thumbnail: file,
                new_imageURL: reader.result,
                imageChanged: true
            });
        };

        if (!file) {
            this.setState({
                ...this.state,
                new_thumbnail: null,
                new_imageURL: null,
                imageChanged: false
            });
            return;
        }

        reader.readAsDataURL(file);
    };

    editConfirmHandler = () => {
        if (!this.state.article.title) {
            alert('Title should not be empty');
            return;
        }
        if (!this.state.article.subtitle) {
            alert('Subtitle should not be empty');
            return;
        }
        if (!this.state.article.content) {
            alert('Content should not be empty');
            return;
        }
        if (this.state.imageChanged && !this.state.new_imageURL) {
            if (
                !window.confirm(
                    "Your image will not be changed if you don't upload image"
                )
            ) {
                return;
            }
        }
        if (this.state.imageChanged && this.state.new_thumbnail) {
            if (this.state.new_thumbnail.size > 1000000) {
                alert('The file cannot be bigger than 1MB');
                return;
            }
            if (!this.state.new_thumbnail.name.match(/.(jpg|jpeg|png)$/i)) {
                alert('You should upload image file');
                return;
            }
        }
        const adpost = {
            ...this.state.article,
            image: this.state.imageChanged
                ? [this.state.new_imageURL]
                : 'not_changed'
        };
        this.props.onputArticle(this.props.match.params.id, adpost);
    };

    render() {
        let imagePreview = null;
        let imageURL = this.state.imageChanged
            ? this.state.new_imageURL
            : this.state.article.thumbnail;

        if (imageURL) {
            imagePreview = <img id="post-thumbnail-preview" src={imageURL} />;
        } else {
            imagePreview = <p>Please upload an image</p>;
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
                                    value={this.state.article.title}
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
                                    value={this.state.article.subtitle}></input>
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
                                    value={
                                        this.state.article.content
                                    }></textarea>
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
                                <div>{imagePreview}</div>
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
        loaded: state.adpost.is_loading,
        article: state.adpost.adpost_detailed_item
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
