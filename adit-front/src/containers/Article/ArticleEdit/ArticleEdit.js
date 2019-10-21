import React, { Component, Profiler } from 'react'
import { Carousel } from 'react-bootstrap';
import { connect } from 'net';
import ReactTags from 'react-tag-autocomplete'
import './ArticleEdit.css'
import intro_first from '../../../assets/intro_first.jpg'
import intro_second from '../../../assets/intro_second.jpg'
import intro_third from '../../../assets/intro_third.jpg'


class ArticleEdit extends Component {
    state = {
        detailedDescription: "Hello, my name is SeoYeongHo and I don't have any thing to write but I have to write a lot of things in order to write something. It should be four lines but it is only two lines, and I want this to be four lines. Therefore, I am writing useless text in order to make this as four lines. Sorry if this code is unreadable, but I have to make this text to be 4 lines",
        title: "Sample title",
        subtitle: "Sample subtitle",
        duedate: "2001/01/16",
        id: 1,
        selectedImage: null,
        imageURL: null,
        valid: false,
        postTag:[],
        mockSuggestion:  [
            { id: 3, name: "Bananas" },
            { id: 4, name: "Mango" },
            { id: 5, name: "Lemons" },
            { id: 6, name: "Apricots" }
        ],
    } // should be props, not state

    titleChangeHandler = (t) => {
        this.setState({
            ...this.state,
            title : t.target.value
        })
    }

    subtitleChangeHandler = (s) => {
        this.setState({
            ...this.state,
            subtitle : s.target.value
        })
    }

    detailedChangeHandler = (d) => {
        this.setState({
            ...this.state,
            detailedDescription: d.target.value
        })
    }

    changePictureHandler = (p) => {
        if(p.target.files[0]){
            this.setState({
                ...this.state,
                selectedImage: p.target.files[0],
                imageURL: URL.createObjectURL(p.target.files[0])
            })
        }
        else{
            this.setState({
                ...this.state,
                selectedImage: null,
                imageURL: null
            })
        }
    }

    editConfirmHandler = () => {
        window.alert("not submitted zz");
        window.location.assign(window.location.href.substring(0, window.location.href.length-5));
    }

    handleDelete = (i) => {
        const tags = this.state.postTag.slice(0)
        tags.splice(i, 1)
        this.setState({ postTag:tags })
    }
     
    handleAddition = (tag) => {
        const tags = [].concat(this.state.postTag, tag)
        this.setState({ postTag:tags })
    }

    render(){
        return(
            <div className = "ArticleEdit">
                <Carousel id = "post-picture-view">
                        <Carousel.Item>
                            {this.state.imageURL && <img className="intro_first" src = {this.state.imageURL} alt='first_picture' width='100%'/>}
                            {!this.state.imageURL && <div className="previewText"><strong>Please select an Image for Preview</strong></div>}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_second" src = {intro_second} alt='second_picture' width='100%'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="intro_third" src = {intro_third} alt='third_picture' width='100%'/>
                        </Carousel.Item>
                </Carousel>
                <input type = "file" id = "edit-picture-input"  onChange = {(e) => {this.changePictureHandler(e)}}/>
                <input className = 'form-control' value = {this.state.title} onChange = {(e) => {this.titleChangeHandler(e)}} id = 'post-title-input'/>
                <input className = 'form-control' value = {this.state.subtitle} onChange = {(e) => {this.subtitleChangeHandler(e)}} id = 'post-subtitle-input'/>
                <p id = 'due-date-text'>{this.state.duedate}</p>
                <div class='tagSelect'>
                        <ReactTags
                            tags={this.state.postTag}
                            suggestions={this.state.mockSuggestion}
                            handleDelete={this.handleDelete.bind(this)}
                            handleAddition={this.handleAddition.bind(this)} 
                            allowNew={true}
                            minQueryLength={1}
                            />
                </div>
                <div className = 'description-component'>
                    <textarea className = 'form-control' value = {this.state.detailedDescription} onChange = {(e) => {this.detailedChangeHandler(e)}} id = 'description-input'/>
                </div>
                <button id = 'confirm-edit-button' onClick = {this.editConfirmHandler} disabled = {!this.state.selectedImage || !this.state.detailedDescription || !this.state.title || !this.state.subtitle}>Confirm</button>
            </div>
        )
    }
}

export default ArticleEdit;