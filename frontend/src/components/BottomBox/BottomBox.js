import React, { Component } from 'react';
import './BottomBox.css';

const mockInfoContent = {
    title: 'Welcome to Adit!',
    content:
        'Adit is an innovative advertising platform that connects those who want to promote their products with people who can recommend great items to their friends. In recent ads outsourcing system, major companies or groups pay a considerable amount of money for advertising. We apply “pay as much as you get, receive as much as you did” system on this market to raise the efficiency.'
};

class BottomBox extends Component {
    state = { title: mockInfoContent.title, content: mockInfoContent.content };

    render() {
        return (
            <div className="BottomBox">
                <div className="InfoParagraph">
                    <div className="InfoTitle">{this.state.title}</div>
                    <div className="InfoContent">{this.state.content}</div>
                </div>
            </div>
        );
    }
}

export default BottomBox;
