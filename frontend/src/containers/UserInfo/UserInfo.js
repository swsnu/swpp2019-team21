import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AOS from 'aos';
import { adpostActions, adreceptionActions } from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import profile from './../../assets/iu_profile.png';
import './UserInfo.css';

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

    tagClickHandler = tagname => {
        this.props.history.push(`/adposts/search/tag/${tagname}`);
    };

    userEditHandler = () => {
        this.props.history.push('/mypage/edit');
    };

    componentDidMount() {
        AOS.init({ duration: 1000 });
        this.props.onGetUserList();
        this.props.onGetReceptionList();
    }

    render() {
        var tags = null;
        var nickname = null;
        var { adpost_user_list } = this.props;
        var own_article = [];
        var participated_article = [];
        var reception_table = null;
        if (this.props.user) {
            const taglist = this.props.user.tags.map(item => (
                <li
                    onClick={() => this.tagClickHandler(item)}
                    className="tag-items">
                    #{item}
                </li>
            ));
            tags = <ul id="tag-link">{taglist}</ul>;
            nickname = this.props.user.nickname;
        }

        if (adpost_user_list[0]) {
            own_article = adpost_user_list[0].data;
        }
        if (adpost_user_list[1]) {
            participated_article = adpost_user_list[1].data;
        }
        //console.log(own_article, participated_article);
        if (
            this.props.reception_list.length > 0 &&
            participated_article.length > 0
        ) {
            reception_table = this.props.reception_list.map(rcp => {
                var acl = participated_article.filter(
                    item => item.id == rcp.adpost
                )[0];
                return (
                    <tr
                        id="table_contents"
                        onClick={() =>
                            this.props.history.push('/article/' + rcp.adpost)
                        }>
                        <td id="post">{acl.title}</td>
                        <td id="link">{rcp.unique_link}</td>
                        <td id="view">{rcp.views}</td>
                        <td id="money">{rcp.views * multiply}</td>
                        <td id="closed">{acl.closed ? 'Closed' : 'Open'}</td>
                    </tr>
                );
            });
        }

        return (
            <div className="UserInfo">
                <section className="user-info-box section-wrapper">
                    <div className="Avatar">
                        <img
                            src={
                                this.props.user.avatar
                                    ? this.props.user.avatar
                                    : ''
                            }
                            onClick={this.imageChangeHandler}
                        />
                    </div>
                    <div className="user-info-text" id="userinfo-titlebox">
                        <div className="main-user-wrapper">
                            <h1 className="title-text" id="userinfo_title">
                                {nickname}
                            </h1>
                            <h2 className="user-name-aggregated">
                                {this.props.user.first_name}{' '}
                                {this.props.user.last_name}∙
                                {this.props.user.email}
                            </h2>
                        </div>
                        {tags}
                    </div>
                    <FontAwesomeIcon
                        icon={faEdit}
                        id="user-edit-btn"
                        onClick={this.userEditHandler}
                    />
                </section>
                <section className="adlist-box section-wrapper">
                    <div className="AdList">
                        <PreviewList
                            articles={own_article.slice(0, 2)}
                            query={'Your Request'}
                            compact={true}
                        />
                        <PreviewList
                            articles={participated_article.slice(0, 2)}
                            query={'Participated'}
                            compact={true}
                        />
                    </div>
                </section>
                <section className="adresult-box section-wrapper">
                    <div className="ReceptionTable" data-aos="fade-up">
                        <h1 className="list-title">Your Receptions</h1>
                        <div className="title-under-line"></div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Post</th>
                                    <th>Your Link</th>
                                    <th>Views</th>
                                    <th>Earned Point</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>{reception_table}</tbody>
                        </Table>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in,
        user: state.user.user,
        adpost_user_list: state.adpost.adpost_home_list,
        reception_list: state.adreception.byuser_list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserList: () => dispatch(adpostActions.getUserAdpostList()),
        onGetReceptionList: () =>
            dispatch(adreceptionActions.getReceptionByUser())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserInfo)
);
