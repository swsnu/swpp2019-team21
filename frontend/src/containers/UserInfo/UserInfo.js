import React, { Component } from 'react';
import profile from './../../assets/iu_profile.png';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import UserDetail from '../../components/UserDetail/UserDetail';
import PreviewList from '../../components/PreviewList/PreviewList';
import './UserInfo.css';
import * as actionCreators from '../../store/actions/user.action';
import * as adpostCreators from '../../store/actions/adpost.action';
import * as adreceptCreators from '../../store/actions/adreception.action';
import background from '../../assets/userinfo_background.jpg';
import { history } from '../../store';

const multiply = 7;
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
        this.props.onGetReceptionList();
    }

    render() {
        var tags = null;
        var nickname = null;
        var own_article = [];
        var participated_article = [];
        var reception_table = null;
        if (this.props.user) {
            tags = this.props.user.tags.map(tg => {
                return <t>#{tg} </t>;
            });
            nickname = this.props.user.nickname;
        }
        if (this.props.own_article) own_article = this.props.own_article;
        if (this.props.participated_article)
            participated_article = this.props.participated_article;
        if (this.props.reception_list && this.props.participated_article) {
            reception_table = this.props.reception_list.map(rcp => {
                var acl = this.props.participated_article.filter(
                    acl => acl.id == rcp.adpost
                )[0];
                console.log(acl);
                return (
                    <tr id='table_contents'onClick={() => history.push('/article/' + rcp.adpost)}>
                        <td id="post">{acl.title}</td>
                        <td id="link">{rcp.unique_link}</td>
                        <td id="view">{rcp.views}</td>
                        <td id="money">{rcp.views * multiply}</td>
                        <td id="closed">{acl.closed ? 'Closed' : 'Open'}</td>
                    </tr>
                );
            });
            console.log(this.props.reception_list);
        }
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
                    <div className="ReceptionTable">
                        <h1 align="left">Your Receptions</h1>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th width="400px">Post</th>
                                    <th width="400px">Your Link</th>
                                    <th width="100px">Views</th>
                                    <th width="100px">Earned Point</th>
                                    <th width="100px">Status</th>
                                </tr>
                            </thead>
                            <tbody>{reception_table}</tbody>
                        </Table>
                    </div>
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
        participated_article: state.adpost.adpost_participated_item,
        reception_list: state.adreception.byuser_list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onsignOut: () => dispatch(actionCreators.signOut()),
        reloadUser: () => dispatch(actionCreators.getUser()),
        onGetOwnList: () => dispatch(adpostCreators.getUserOwnList()),
        onGetParticipatedList: () =>
            dispatch(adpostCreators.getUserParticipatedList()),
        onGetReceptionList: () =>
            dispatch(adreceptCreators.getReceptionByUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
