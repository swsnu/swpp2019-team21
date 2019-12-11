import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import AOS from 'aos';
import { adpostActions, adreceptionActions } from '../../store/actions';
import UserDetail from '../../components/UserDetail/UserDetail';
import PreviewList from '../../components/PreviewList/PreviewList';
import background from '../../assets/userinfo_background.jpg';
import profile from './../../assets/iu_profile.png';
import './UserInfo.css';

const multiply = 7;
class UserInfo extends Component {
    state = {
        is_loaded: false,
        email: '',
        fname: '',
        lname: '',
        nickname: '',
        point: -0x7fffffff,
        profileimg: profile,
        usertag: []
    };

    componentDidMount() {
        AOS.init({ duration: 1000 });
        this.props.onGetUserList();
        this.props.onGetReceptionList().then(res => {
            this.setState({
                ...this.state,
                is_loaded: true
            });
        });
    }

    render() {
        if (this.state.is_loaded) {
            var tags = null;
            var nickname = null;
            var { adpost_user_list } = this.props;
            var own_article = [];
            var participated_article = [];
            var reception_table = null;
            if (this.props.user) {
                tags = this.props.user.tags.map(tg => {
                    return <text id="tags">#{tg} </text>;
                });
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
                                this.props.history.push(
                                    '/article/' + rcp.adpost
                                )
                            }>
                            <td id="post">{acl.title}</td>
                            <td id="link">{rcp.unique_link}</td>
                            <td id="view">{rcp.views}</td>
                            <td id="money">{rcp.views * multiply}</td>
                            <td id="closed">
                                {acl.closed ? 'Closed' : 'Open'}
                            </td>
                        </tr>
                    );
                });
            }

            return (
                <div className="UserInfo">
                    <img src={background} id="title-background" />
                    <div className="TitleBox" id="userinfo-titlebox">
                        <text className="Title" id="userinfo_title">
                            Hello, {nickname}!
                        </text>
                        <p>
                            <tgs>{tags}</tgs>
                        </p>
                    </div>
                    <div className="AdList">
                        <PreviewList
                            articles={own_article}
                            query={'Your Request'}
                            compact={true}
                        />
                        <PreviewList
                            articles={participated_article}
                            query={'Participated'}
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
        } else {
            return (
                <div>
                    <Spinner
                        animation="border"
                        id="redirecting_spinner"
                        variant="danger"
                    />
                </div>
            );
        }
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
    connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
