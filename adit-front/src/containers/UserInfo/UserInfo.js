import React, { Component, Profiler } from 'react';
import {
    Dropdown,
    DropdownButton,
    Navbar,
    Image,
    OverlayTrigger,
    Popover,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import profile from './../../assets/iu_profile.png';
import { connect } from 'react-redux';
import UserDetail from '../../components/UserDetail/UserDetail';
import PreviewList from '../../components/PreviewList/PreviewList';
import BottomBox from '../../components/BottomBox/BottomBox';
import './UserInfo.css';
import * as actionCreators from '../../store/actions/user.action';
import background from '../../assets/userinfo_background.jpg';
import thumbnail from '../../assets/thumbnail_example.png';

const mockAdPostList = [...Array(10).keys()].map(index => {
    return {
        id: index,
        day: 20,
        thumbnail: thumbnail,
        title: 'Mocked Title ' + index.toString(),
        subtitle: 'Mocked SubTitle ' + index.toString(),
        acheive_rate: 77,
        expiry_date: 10,
        tags: []
    };
});

class UserInfo extends Component {
    state = {
        email: 'csh3695@naver.com',
        fname: 'Seonghwan',
        lname: 'Choi',
        nickname: 'Kent',
        point: 0x7fffffff,
        profileimg: profile,
        usertag: ['student', 'SNU', 'club', 'band']
    };
    tags = this.props.user.tags.map(tg => {
        return <t>#{tg} </t>;
    });

    render() {
        return (
            <div className="UserInfo">
                <img src={background} id="title-background" />
                <div className="TitleBox" id="userinfo-titlebox">
                    <ttl className="Title" id="userinfo_title">
                        Hello, {this.props.user.nickname}!
                    </ttl>
                    <p>
                        <tgs>{this.tags}</tgs>
                    </p>
                </div>
                <div className="AdList">
                    <PreviewList
                        articles={mockAdPostList}
                        list_name={'Your Request'}
                        compact={true}
                    />
                    <PreviewList
                        articles={mockAdPostList}
                        list_name={'Participated'}
                        compact={true}
                    />
                </div>
                <UserDetail {...this.props.user} />
                <footer className="footer">
                    <BottomBox />
                </footer>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in,
        user: state.user.user
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onsignOut: () => dispatch(actionCreators.signOut()),
        reloadUser: () => dispatch(actionCreators.getUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
