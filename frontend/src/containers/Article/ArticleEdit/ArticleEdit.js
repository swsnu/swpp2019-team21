import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adpostActions } from '../../../store/actions/adpost.action';
import './ArticleEdit.css';

class ArticleEdit extends Component {
    state = {
        is_loadcomplete: false,
        title: '',
        subtitle: '',
        duedate: '',
        content: '',
        id: 1,
        thumbnail: null,
        imageURL: null,
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
        this.props.ongetArticle(this.props.match.params.id);
    }

    titleChangeHandler = t => {
        if (t.target.value.length <= 30) {
            this.setState({
                ...this.state,
                title: t.target.value
            });
        } else {
            alert('제목은 30자를 넘을 수 없습니다');
        }
    };

    subtitleChangeHandler = s => {
        if (s.target.value.length <= 30) {
            this.setState({
                ...this.state,
                subtitle: s.target.value
            });
        } else {
            alert('부제목은 30자를 넘을 수 없습니다');
        }
    };

    detailedChangeHandler = d => {
        if (d.target.value.length <= 10000) {
            this.setState({
                ...this.state,
                content: d.target.value
            });
        } else {
            alert('설명은 10000자를 넘을 수 없습니다');
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
            alert('제목을 입력하세요');
            return;
        }
        if (!this.state.subtitle) {
            alert('부제목을 입력하세요');
            return;
        }
        if (!this.state.content) {
            alert('내용을 입력하세요');
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
            alert('이미지를 업로드하세요');
            return;
        }
        if (this.state.postFile) {
            if (this.state.postFile.size > 1000000) {
                alert('사진 용량은 1MB 이하여야 합니다');
                return;
            }
            if (!this.state.postFile.name.match(/.(jpg|jpeg|png)$/i)) {
                alert('jpg, jpeg, png, bmp 형식 파일이 가능합니다');
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
                        <div className="EditHead">
                            <section className="EditHeadTitle section-wrapper">
                                <h1 className="EditHeadTitle">편집</h1>
                                <p className="EditHeadContent">편집하세요</p>
                            </section>
                        </div>
                        <div className="EditBody section-wrapper">
                            <div className="configuration">
                                <div className="form-group" align="center">
                                    <h3 className="form-label">무슨 광고인가요?</h3>
                                    <input
                                        className="form-control"
                                        id="post-title-input"
                                        onChange={this.titleChangeHandler}
                                        defaultValue={this.props.article.title}
                                        value={this.state.postTitle}
                                    />
                                </div>
                                <p />
                                <br />
                                <div className="form-group" align="center">
                                    <h3 className="form-label">한줄 설명</h3>
                                    <input
                                        className="form-control"
                                        id="post-subtitle-input"
                                        onChange={this.subtitleChangeHandler}
                                        defaultValue={
                                            this.props.article.subtitle
                                        }
                                        value={this.state.postSubtitle}></input>
                                </div>
                                <p />
                                <br />
                                <div className="form-group" align="center">
                                    <h3 className="form-label">
                                        광고에 대해 자세히 알려주세요
                                    </h3>
                                    <textarea
                                        className="form-control"
                                        id="post-explain-input"
                                        onChange={this.detailedChangeHandler}
                                        value={this.state.content}></textarea>
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
                                        id="post-thumbnail-input"
                                        multiple={false}
                                        onChange={this.imageOnChange}
                                    />
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
        loaded: !state.adpost.adpost_detailed_item.is_loading,
        article: state.adpost.adpost_detailed_item
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
