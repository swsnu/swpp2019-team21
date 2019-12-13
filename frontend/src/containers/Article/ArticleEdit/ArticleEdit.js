import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adpostActions } from '../../../store/actions/adpost.action';
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
        },
        valid: {
            title: null,
            subtitle: null,
            content: null,
            thumbnail: null
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
            if (!this.props.article.is_owner) {
                this.props.history.push('/home');
            }
        }
    }

    titleChangeHandler = e => {
        console.log(e.target.value)
        var valid = e.target.value.length <= 30 && e.target.value.length > 0;
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    title: e.target.value
                },
                valid: {
                    ...this.state.valid,
                    title: valid
                }
            });
        } else {
            alert('제목은 30자를 넘을 수 없습니다');
        }
    };

    subtitleChangeHandler = e => {
        var valid = e.target.value.length <= 30 && e.target.value.length > 0;
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    subtitle: e.target.value
                },
                valid: {
                    ...this.state.valid,
                    subtitle: valid
                }
            });
        } else {
            alert('부제목은 30자를 넘을 수 없습니다');
        }
    };

    detailedChangeHandler = e => {
        var valid = e.target.value.length <= 10000 && e.target.value.length > 0;
        if (e.target.value.length <= 10000) {
            this.setState({
                ...this.state,
                article: {
                    ...this.state.article,
                    content: e.target.value
                },
                valid: {
                    ...this.state.valid,
                    content: valid
                }
            });
        } else {
            alert('설명은 10000자를 넘을 수 없습니다');
        }
    };

    imageOnChange = e => {
        var valid = false;
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.log(file.name)
            valid =
                file &&
                file.name.match(/.(jpg|jpeg|png|bmp)$/i) &&
                file.size <= 1000000;
            if (valid) {
                this.setState({
                    ...this.state,
                    new_thumbnail: file,
                    new_imageURL: reader.result,
                    imageChanged: true,
                    valid: {
                        ...this.state.valid,
                        thumbnail: valid
                    }
                });
            } else {
                alert('1MB 이내의 jpg, jpeg, png, bmp 형식 파일이 가능합니다');
                this.setState({
                    ...this.state,
                    valid: {
                        ...this.state.valid,
                        thumbnail: false
                    }
                });
            }
        };

        if (!file) {
            this.setState({
                ...this.state,
                new_thumbnail: null,
                new_imageURL: null,
                imageChanged: false,
                valid: {
                    ...this.state.valid,
                    thumbnail: valid
                }
            });
            return;
        }

        reader.readAsDataURL(file);
    };

    editConfirmHandler = () => {
        console.log(this.state)
        if (!this.state.article.title) {
            alert('제목을 입력하세요');
            return;
        }
        if (!this.state.article.subtitle) {
            alert('부제목을 입력하세요');
            return;
        }
        if (!this.state.article.content) {
            alert('내용을 입력하세요');
            return;
        }
        if (this.state.imageChanged && !this.state.new_imageURL) {
            alert('이미지를 업로드하세요');
            return;
        }
        if (this.state.new_thumbnail) {
            if (this.state.new_thumbnail.size > 1000000) {
                alert('사진 용량은 1MB 이하여야 합니다');
                return;
            }
            if (!this.state.new_thumbnail.name.match(/.(jpg|jpeg|png)$/i)) {
                alert('jpg, jpeg, png, bmp 형식 파일이 가능합니다');
            }
        }
        const adpost = {
            ...this.state.article,
            image: this.state.imageChanged
                ? [this.state.new_imageURL]
                : ['not_changed']
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
                        <div className="EditHead">
                            <section className="EditHeadTitle section-wrapper">
                                <h1 className="EditHeadTitle">편집</h1>
                                <p className="EditHeadContent">편집하세요</p>
                            </section>
                        </div>
                        <div className="EditBody section-wrapper">
                            <div className="configuration">
                                <div className="form-group" align="center">
                                    <h3 className="form-label">
                                        무슨 광고인가요?
                                    </h3>
                                    <input
                                        className="form-control"
                                        id={
                                            'post-title-input' +
                                            (this.state.valid.title === false
                                                ? ' invalid-input'
                                                : ' valid-input')
                                        }
                                        onChange={this.titleChangeHandler}
                                        value={this.state.article.title}
                                    />
                                    <p id="input-warning" align="left">
                                        {this.state.valid.title === false ? (
                                            '제목을 입력하세요'
                                        ) : (
                                            <br />
                                        )}{' '}
                                    </p>
                                </div>
                                <p />
                                <br />
                                <div className="form-group" align="center">
                                    <h3 className="form-label">한줄 설명</h3>
                                    <input
                                        className="form-control"
                                        id={
                                            'post-subtitle-input' +
                                            (this.state.valid.subtitle === false
                                                ? ' invalid-input'
                                                : ' valid-input')
                                        }
                                        onChange={this.subtitleChangeHandler}
                                        value={this.state.article.subtitle}
                                    />
                                    <p id="input-warning" align="left">
                                        {this.state.valid.subtitle === false ? (
                                            '부제목을 입력하세요'
                                        ) : (
                                            <br />
                                        )}{' '}
                                    </p>
                                </div>
                                <p />
                                <br />
                                <div className="form-group" align="center">
                                    <h3 className="form-label">
                                        광고에 대해 자세히 알려주세요
                                    </h3>
                                    <textarea
                                        className="form-control"
                                        id={
                                            'post-explain-input' +
                                            (this.state.valid.content === false
                                                ? ' invalid-input'
                                                : ' valid-input')
                                        }
                                        onChange={this.detailedChangeHandler}
                                        value={this.state.article.content}
                                    />
                                    <p id="input-warning" align="left">
                                        {this.state.valid.content === false ? (
                                            '설명을 입력하세요'
                                        ) : (
                                            <br />
                                        )}{' '}
                                    </p>
                                </div>
                                <p />
                                <br />
                                <div className="form-group" align="center">
                                    <h3 className="form-label">
                                        이미지를 업로드하세요
                                    </h3>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id={
                                            'post-thumbnail-input' +
                                            (this.state.valid.thumbnail ===
                                            false
                                                ? ' invalid-input'
                                                : ' valid-input')
                                        }
                                        multiple={false}
                                        onChange={this.imageOnChange}
                                    />
                                    <p id="input-warning" align="left">
                                        {this.state.valid.thumbnail ===
                                        false ? (
                                            '이미지 파일을 업로드하세요'
                                        ) : (
                                            <br />
                                        )}{' '}
                                    </p>

                                    <div>{imagePreview}</div>
                                </div>
                                <p />
                                <br />
                                <button
                                    className="btn btn-primary submit-btn"
                                    id="next-button"
                                    onClick={this.editConfirmHandler}>
                                    수정하기
                                </button>
                            </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleEdit);
