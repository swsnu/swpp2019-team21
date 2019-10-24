import React, { Component, Profiler } from 'react';
import {Button} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import ReactTags from 'react-tag-autocomplete'
import './ArticleCreate.css'
import Calendar from 'react-calendar';

class ArticleCreate extends Component {
    state = {
        donePage:1,
        currentPage:1,
        postTag:[],
        postTitle:'',
        postSubtitle:'',
        postExplain:'',
        postFile:'',
        postUrl:'',
        postGoal:'',
        postDeadline: {
            year:'',
            month:'',
            date:''
        },
        mockSuggestion:  [
            { id: 3, name: "Bananas" },
            { id: 4, name: "Mango" },
            { id: 5, name: "Lemons" },
            { id: 6, name: "Apricots" }
        ],
        imagePreviewUrl:''
    };
    render() {
        let imagePreview = null
        let imagePreviewUrl = this.state.imagePreviewUrl;
        if (imagePreviewUrl) {
            imagePreview = (<img id='post-thumbnail-preview' src={imagePreviewUrl}/>);
        } else {
            imagePreview = (<div className="previewText"><strong>Please select an Image for Preview</strong></div>);
        }
        const handleDelete = (i) => {
            const tags = this.state.postTag.slice(0)
            tags.splice(i, 1)
            this.setState({ postTag:tags })
        }
         
        const handleAddition = (tag) => {
            const tags = [].concat(this.state.postTag, tag)
            this.setState({ postTag:tags })
        }
     

        const tabOnClick = (n) => {
            if(n<=this.state.donePage) {
                return () => {
                    this.setState({
                        ...this.state,
                        currentPage:n
                    })
                };
            }
            else {
                return () => {};
            }
        }
        const color = (n) => {
            if(n>this.state.donePage) {
                return 'Grey';
            }
            else {
                return 'DodgerBlue';
            }
        }
        const tabtext = (n) => {
            let tabs = ['Configure Info','Select Tag','Ad Goal','Preview'];
            if(this.state.currentPage==n) {
                return (
                    <text id={"tab-text"+n} style={{color:color(n)}} onClick={tabOnClick(n)}><strong>{tabs[n-1]}</strong></text>
                );
            }
            else {
                return (
                    <text id={"tab-text"+n} style={{color:color(n)}} onClick={tabOnClick(n)}> {tabs[n-1]}</text>
                );
            }
        }
        const tabs = () => {
            return(
                <div id="createTabs">
                {tabtext(1)}
                <text> > </text>
                {tabtext(2)}
                <text> > </text>
                {tabtext(3)}
                <text> > </text>
                {tabtext(4)}
                </div>
            )
        }
        const titleChangeHandler = (i) => {
            this.setState ({
                ...this.state,
                postTitle:i.target.value
            })
        }
        const subtitleChangeHandler = (i) => {
            this.setState ({
                ...this.state,
                postSubtitle:i.target.value
            })
        }
        const explainChangeHandler = (i) => {
            this.setState ({
                ...this.state,
                postExplain:i.target.value
            })
        }
        const urlChangeHandler = (i) => {
            this.setState ({
                ...this.state,
                postUrl:i.target.value
            })
        }
        const imageOnChange = (e) => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];
        
            reader.onloadend = () => {
              this.setState({
                postFile: file,
                imagePreviewUrl: reader.result
              });
            }
            
            reader.readAsDataURL(file);
        }
        const goalChangeHandler = (e) => {
            this.setState ({
                ...this.state,
                postGoal: e.target.value
            })
        }
        const nextOnClick = () => {
            if(this.state.donePage===this.state.currentPage) {
                this.setState({
                    ...this.state,
                    donePage:this.state.donePage+1, 
                    currentPage:this.state.currentPage+1
                })
            }
            else {
                this.setState({
                    ...this.state,
                    currentPage:this.state.currentPage+1
                });
            }
        }
        const confirmOnClick = () => {
            this.props.history.push('/article/1');
        }
        const onCalendarChange = (e) => {
            this.setState ({
                ...this.state,
                postDeadline: {
                    year: e.getYear()+1900,
                    month: e.getMonth()+1,
                    date: e.getDate()
                }
            })
        }
        const views = (n) => {
            let tenDay = new Date();
            tenDay.setTime(tenDay.getTime()+10*24*3600*1000);
            return (
                <div>
                    <div class='configuration' style={{ display: (this.state.currentPage==1) ? 'block':'none' }}>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Title</h3>
                            <input className="form-control" placeholder=" input title" id="post-title-input" onChange={titleChangeHandler} value={this.state.postTitle}/>
                        </div>
                        <p/><br/>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Subtitle</h3>
                            <input className="form-control" placeholder=" input subtitle" id="post-subtitle-input" onChange={subtitleChangeHandler} value={this.state.postSubtitle}></input>
                        </div>
                        <p/><br/>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Ad Description</h3>
                            <textarea className="form-control" placeholder=" explain your ad" id="post-explain-input" onChange={explainChangeHandler} value={this.state.postExplain}></textarea>
                        </div>
                        <p/><br/>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Select Thumbnail</h3>
                            <input className="form-control" type="file" id="post-thumbnail-input" multiple={false} onChange={imageOnChange}/>
                            <div>
                            {imagePreview}
                            </div>
                        </div>
                        <p/><br/>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Ad Url</h3>
                            <input className="form-control" placeholder=" input url of ad" id="post-url-input" onChange={urlChangeHandler} value={this.state.postUrl.bind}></input>
                        </div>
                        <p/><br/>
                        <button className="btn btn-primary" id='next-button' disabled={!this.state.postFile||!this.state.postTitle||!this.state.postUrl||!this.state.postSubtitle} onClick={nextOnClick}>Next</button>
                    </div>
                    <div class='tagSelect'style={{ display: (this.state.currentPage==2) ? 'block':'none' }}>
                        <ReactTags
                            tags={this.state.postTag}
                            suggestions={this.state.mockSuggestion}
                            handleDelete={handleDelete.bind(this)}
                            handleAddition={handleAddition.bind(this)} 
                            allowNew={true}
                            minQueryLength={1}
                        />
                        <button className="btn btn-primary" id='next-button' disabled={!this.state.postTag.length} onClick={nextOnClick}>Next</button>
                    </div>
                    <div class='adGoal'style={{ display: (this.state.currentPage==3) ? 'block':'none' }}>
                        <div className='form-group' align='center'>
                            <h3 className="form-label">Set Ad Goal</h3>
                            <input className="form-control" type="number" placeholder=" input goal" id="post-goal-input" onChange={goalChangeHandler} value={this.state.postGoal}/>
                        </div>
                        <p/><br/>
                            <h3 className="label">Choose Ad Expiry Date</h3>
                            <Calendar minDate={tenDay} onChange={onCalendarChange}/>
                        <p/><br/>
                        <button className="btn btn-primary" id='next-button' disabled={!this.state.postGoal||!this.state.postDeadline.year} onClick={nextOnClick}>Next</button>
                    </div>
                    <div class='payment'style={{ display: (this.state.currentPage==4) ? 'block':'none' }}>
                        <button className="btn btn-primary" id='confirm-button' onClick={confirmOnClick}>Submit</button>
                    </div>
                    
                </div>
            );
        }
        return (
            <div className = "ArticleCreate" align='center'>
                <h1 id='pageTitle'>Request Ad</h1>
                {tabs()}
                {views(this.state.currentPage)}
            </div>
        )
    }
}

export default ArticleCreate;
