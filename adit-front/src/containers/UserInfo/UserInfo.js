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
import './UserInfo.css';
import * as actionCreators from '../../store/actions/user.action';
import * as adpostCreators from '../../store/actions/adpost.action';
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

    componentDidMount() {
        this.props.onGetOwnList();
        this.props.onGetParticipatedList();
    }

    render() {
        var tags = this.props.user.tags.map(tg => {
            return <t>#{tg} </t>;
        });
        return (
            <div className="UserInfo">
                <img src={background} id="title-background" />
                <div className="TitleBox" id="userinfo-titlebox">
                    <ttl className="Title" id="userinfo_title">
                        Hello, {this.props.user.nickname}!
                    </ttl>
                    <p>
                        <tgs>{tags}</tgs>
                    </p>
                </div>
                <div className="AdList">
                    <PreviewList
                        articles={
                            this.props.own_article ? this.props.own_article : []
                        }
                        list_name={'Your Request'}
                        compact={true}
                    />
                    <PreviewList
                        articles={
                            this.props.participated_article
                                ? this.props.participated_article
                                : []
                        }
                        list_name={'Participated'}
                        compact={true}
                    />
                </div>
                <UserDetail />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in,
        user: state.user.user,
        own_article: state.adpost.adpost_own_item,
        participated_article: state.adpost.adpost_participated_item
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onsignOut: () => dispatch(actionCreators.signOut()),
        reloadUser: () => dispatch(actionCreators.getUser()),
        onGetOwnList: () => dispatch(adpostCreators.getUserOwnList()),
        onGetParticipatedList: () =>
            dispatch(adpostCreators.getUserParticipatedList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
