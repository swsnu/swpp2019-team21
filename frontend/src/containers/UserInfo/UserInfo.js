import React, { Component } from 'react';
import profile from './../../assets/iu_profile.png';
import { connect } from 'react-redux';
import UserDetail from '../../components/UserDetail/UserDetail';
import PreviewList from '../../components/PreviewList/PreviewList';
import './UserInfo.css';
import * as actionCreators from '../../store/actions/user.action';
import * as adpostCreators from '../../store/actions/adpost.action';
import background from '../../assets/userinfo_background.jpg';

class UserInfo extends Component {
    state = {
        email: '',
        fname: '',
        lname: '',
        nickname: '',
        point: -0x7fffffff,
        profileimg: profile,
        usertag: []
    };

    componentDidMount() {
        this.props.onGetOwnList();
        this.props.onGetParticipatedList();
    }

    render() {
        var tags = null;
        var nickname = null;
        var own_article = [];
        var participated_article = [];
        if(this.props.user){       
            tags = this.props.user.tags.map(tg => {return <t>#{tg} </t>});
            nickname = this.props.user.nickname
        }
        if(this.props.own_article) own_article = this.props.own_article
        if(this.props.participated_article) participated_article = this.props.participated_article
        return (
            <div className="UserInfo">
                <img src={background} id="title-background" />
                <div className="TitleBox" id="userinfo-titlebox">
                    <ttl className="Title" id="userinfo_title">
                        Hello, {nickname}!
                    </ttl>
                    <p>
                        <tgs>{tags}</tgs>
                    </p>
                </div>
                <div className="AdList">
                    <PreviewList
                        articles={own_article}
                        list_name={'Your Request'}
                        compact={true}
                    />
                    <PreviewList
                        articles={participated_article}
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
        onGetParticipatedList: () => dispatch(adpostCreators.getUserParticipatedList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);