import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/adpost.action';
import * as userActionCreators from '../../../store/actions/user.action';
import { tagActions } from '../../../store/actions/tag.action';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import Preview from '../../../components/Preview/Preview';
import './ArticleCreate.css';
import Calendar from 'react-calendar';

var multiplier = 10;
class ArticleCreate extends Component {
    state = {
        donePage: 1,
        currentPage: 1,
        postTag: [],
        postTitle: '',
        postSubtitle: '',
        postExplain: '',
        postFile: '',
        postUrl: '',
        postGoal: '',
        postDeadline: {
            year: '',
            month: '',
            date: ''
        },
        mockSuggestion: [
            { id: 3, name: 'Bananas' },
            { id: 4, name: 'Mango' },
            { id: 5, name: 'Lemons' },
            { id: 6, name: 'Apricots' }
        ],
        imagePreviewUrl: '',
        nowpoint: 0
    };

    componentDidMount() {
        this.props.reloadUser().then(res => {
            this.setState({
                nowpoint: res.user.point
            });
        });
        this.props.onTagReload();
    }
    render() {
        let imagePreview = null;
        let imagePreviewUrl = this.state.imagePreviewUrl;
        console.log(this.props.allTags);
        console.log('MAMA');
        if (imagePreviewUrl) {
            imagePreview = (
                <img id="post-thumbnail-preview" src={imagePreviewUrl} />
            );
        } else {
            imagePreview = (
                <div className="previewText">
                    <strong>Please select an Image for Preview</strong>
                </div>
            );
        }
        const handleDelete = i => {
            const tags = this.state.postTag.slice(0);
            tags.splice(i, 1);
            this.setState({ postTag: tags });
        };

        const handleAddition = tag => {
            const tags = [].concat(this.state.postTag, tag);
            this.setState({ postTag: tags });
        };

        const tabOnClick = n => {
            if (n <= this.state.donePage) {
                return () => {
                    this.setState({
                        ...this.state,
                        currentPage: n
                    });
                };
            } else {
                return () => {};
            }
        };
        const color = n => {
            if (n > this.state.donePage) {
                return 'Grey';
            } else {
                return 'DodgerBlue';
            }
        };
        const tabtext = n => {
            let tabs = ['Configure Info', 'Select Tag', 'Ad Goal', 'Preview'];
            if (this.state.currentPage == n) {
                return (
                    <text
                        id={'tab-text' + n}
                        style={{ color: color(n) }}
                        onClick={tabOnClick(n)}>
                        <strong>{tabs[n - 1]}</strong>
                    </text>
                );
            } else {
                return (
                    <text
                        id={'tab-text' + n}
                        style={{ color: color(n) }}
                        onClick={tabOnClick(n)}>
                        {' '}
                        {tabs[n - 1]}
                    </text>
                );
            }
        };
        const tabs = () => {
            return (
                <div id="createTabs">
                    {tabtext(1)}
                    <text> > </text>
                    {tabtext(2)}
                    <text> > </text>
                    {tabtext(3)}
                    <text> > </text>
                    {tabtext(4)}
                </div>
            );
        };
        const titleChangeHandler = i => {
            this.setState({
                ...this.state,
                postTitle: i.target.value
            });
        };
        const subtitleChangeHandler = i => {
            this.setState({
                ...this.state,
                postSubtitle: i.target.value
            });
        };
        const explainChangeHandler = i => {
            this.setState({
                ...this.state,
                postExplain: i.target.value
            });
        };
        const urlChangeHandler = i => {
            this.setState({
                ...this.state,
                postUrl: i.target.value
            });
        };
        const imageOnChange = e => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    postFile: file,
                    imagePreviewUrl: reader.result
                });
            };

            reader.readAsDataURL(file);
        };
        const goalChangeHandler = e => {
            const re = /^[1-9]+[0-9\b]*$/;

            if (
                (e.target.value == '' || re.test(e.target.value)) &&
                this.state.nowpoint - Number(e.target.value) * multiplier >= 0
            ) {
                this.setState({
                    ...this.state,
                    postGoal: e.target.value
                });
            }
        };
        const nextOnClick = () => {
            window.scrollTo(0, 0);
            if (this.state.donePage === this.state.currentPage) {
                this.setState({
                    ...this.state,
                    donePage: this.state.donePage + 1,
                    currentPage: this.state.currentPage + 1
                });
            } else {
                this.setState({
                    ...this.state,
                    currentPage: this.state.currentPage + 1
                });
            }
        };
        const confirmOnClick = () => {
            if (!this.state.postTitle) {
                alert('Title should not be empty');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (!this.state.postSubtitle) {
                alert('Subtitle should not be empty');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (!this.state.postExplain) {
                alert('Content should not be empty');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (!this.state.imagePreviewUrl) {
                alert('You should upload image');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (!this.state.postUrl) {
                alert('Ad url should not be empty');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (
                this.state.postUrl.toString().length < 9 ||
                (this.state.postUrl.toString().substring(0, 7) !== 'http://' &&
                    this.state.postUrl.toString().substring(0, 8) !==
                        'https://')
            ) {
                alert('Ad url should start with http:// or https://');
                this.setState({ ...this.state, currentPage: 1 });
                return;
            }
            if (!this.state.postTag) {
                if (
                    !window.confirm(
                        'The tags are blank. Are you sure you want to submit?'
                    )
                ) {
                    this.setState({ ...this.state, currentPage: 2 });
                    return;
                }
            }
            if (!this.state.postGoal) {
                alert('Ad goal should not be empty');
                this.setState({ ...this.state, currentPage: 3 });
            }

            const request = {
                points: {
                    point: Number(
                        this.state.nowpoint - this.state.postGoal * multiplier
                    )
                },
                adpost: {
                    title: this.state.postTitle,
                    subtitle: this.state.postSubtitle,
                    content: this.state.postExplain,
                    image: [this.state.imagePreviewUrl],
                    ad_link: this.state.postUrl,
                    target_views: this.state.postGoal,
                    expiry_date:
                        this.state.postDeadline.year +
                        '-' +
                        this.state.postDeadline.month +
                        '-' +
                        this.state.postDeadline.date,
                    tags: this.state.postTag.map(tag => {
                        return tag.name;
                    })
                }
            };
            this.props.onPostArticle(request);
            //this.props.history.push('/article/1');
        };
        const onCalendarChange = e => {
            this.setState({
                ...this.state,
                postDeadline: {
                    year: e.getYear() + 1900,
                    month: e.getMonth() + 1,
                    date: e.getDate()
                }
            });
        };
        const views = n => {
            let tenDay = new Date();
            tenDay.setTime(tenDay.getTime() + 10 * 24 * 3600 * 1000);
            return (
                <div>
                    <div
                        className="configuration"
                        style={{
                            display:
                                this.state.currentPage == 1 ? 'block' : 'none'
                        }}>
                        <div className="form-group" align="center">
                            <h3 className="form-label">Title</h3>
                            <input
                                className="form-control"
                                placeholder=" input title"
                                id="post-title-input"
                                onChange={titleChangeHandler}
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
                                onChange={subtitleChangeHandler}
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
                                onChange={explainChangeHandler}
                                value={this.state.postExplain}></textarea>
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
                                onChange={imageOnChange}
                            />
                            <div>{imagePreview}</div>
                        </div>
                        <p />
                        <br />
                        <div className="form-group" align="center">
                            <h3 className="form-label">Ad Url</h3>
                            <input
                                className="form-control"
                                placeholder=" input url of ad"
                                id="post-url-input"
                                onChange={urlChangeHandler}
                                value={this.state.postUrl.bind}></input>
                        </div>
                        <p />
                        <br />
                        <button
                            className="btn btn-primary"
                            id="next-button"
                            disabled={
                                !this.state.postFile ||
                                !this.state.postTitle ||
                                !this.state.postUrl ||
                                !this.state.postSubtitle
                            }
                            onClick={nextOnClick}>
                            Next
                        </button>
                    </div>
                    <div
                        className="tagSelect"
                        style={{
                            display:
                                this.state.currentPage == 2 ? 'block' : 'none'
                        }}>
                        <ReactTags
                            tags={this.state.postTag}
                            suggestions={this.props.allTags}
                            handleDelete={handleDelete.bind(this)}
                            handleAddition={handleAddition.bind(this)}
                            allowNew={true}
                            minQueryLength={1}
                        />
                        <button
                            className="btn btn-primary"
                            id="next-tag-button"
                            disabled={!this.state.postTag.length}
                            onClick={nextOnClick}>
                            Next
                        </button>
                    </div>
                    <div
                        className="adGoal"
                        style={{
                            display:
                                this.state.currentPage == 3 ? 'block' : 'none'
                        }}>
                        <div className="form-group" align="center">
                            <h3 className="form-label">Set Ad Goal</h3>
                            <input
                                className="form-control"
                                placeholder=" input goal"
                                id="post-goal-input"
                                onChange={goalChangeHandler}
                                value={this.state.postGoal}
                            />
                        </div>
                        <div className="form-group" align="center">
                            <p
                                className="form-control"
                                id="post-point-deduction">
                                {this.state.postGoal
                                    ? this.state.postGoal * multiplier
                                    : 0}{' '}
                                points will be deducted
                            </p>
                            <p
                                className="form-control"
                                id="post-point-deduction">
                                {this.state.postGoal
                                    ? this.state.nowpoint -
                                      this.state.postGoal * multiplier
                                    : this.state.nowpoint}{' '}
                                points will be left
                            </p>
                        </div>
                        <p />
                        <br />
                        <h3 className="label">Choose Ad Expiry Date</h3>
                        <Calendar
                            minDate={tenDay}
                            onChange={onCalendarChange}
                        />
                        <p />
                        <br />
                        <button
                            className="btn btn-primary"
                            id="next-button"
                            disabled={
                                !this.state.postGoal ||
                                !this.state.postDeadline.year
                            }
                            onClick={nextOnClick}>
                            Next
                        </button>
                    </div>
                    <div
                        className="payment"
                        style={{
                            display:
                                this.state.currentPage == 4 ? 'block' : 'none'
                        }}>
                        <ArticlePreview
                            article={{
                                title: this.state.postTitle,
                                subtitle: this.state.postSubtitle,
                                content: this.state.postExplain,
                                thumbnail: [this.state.imagePreviewUrl],
                                ad_link: this.state.postUrl,
                                target_views: this.state.postGoal,
                                expiry_date:
                                    this.state.postDeadline.year +
                                    '-' +
                                    this.state.postDeadline.month +
                                    '-' +
                                    this.state.postDeadline.date,
                                tags: this.state.postTag.map(tag => {
                                    return tag.name;
                                })
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            id="confirm-button"
                            onClick={confirmOnClick}>
                            Submit
                        </button>
                    </div>
                </div>
            );
        };
        return (
            <div className="ArticleCreate" align="center">
                <h1 id="pageTitle">Request Ad</h1>
                {tabs()}
                {views(this.state.currentPage)}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostArticle: adpost => {
            dispatch(actionCreators.postAdpost(adpost));
        },
        reloadUser: () => dispatch(userActionCreators.getUser()),
        onTagReload: () => dispatch(tagActions.getAllTag())
    };
};

const mapStateToProps = state => {
    return {
        allTags: state.tag.all_tags
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleCreate);
