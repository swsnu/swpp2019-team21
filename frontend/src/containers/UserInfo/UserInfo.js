import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import AOS from 'aos';
import {
    adpostActions,
    adreceptionActions,
    userActions
} from '../../store/actions';
import PreviewList from '../../components/PreviewList/PreviewList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserEdit,
    faChargingStation
} from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png';
import './UserInfo.css';

const multiply = 7;
class UserInfo extends Component {
    state = {
        user_loaded: false,
        reception_loaded: false,
        email: '',
        fname: '',
        lname: '',
        nickname: '',
        point: -0x7fffffff,
        profileimg: profile,
        usertag: [],
        addpoint: 0
    };

    tagClickHandler = tagname => {
        this.props.history.push(`/adposts/search/tag/${tagname}`);
    };

    userEditHandler = () => {
        this.props.history.push('/mypage/edit');
    };

    userChargeHandler = () => {
        this.setState({ ...this.state, showChargePoint: true });
    };

    chargePointFinishHandler = () => {
        this.props.updatePoint({
            point: this.props.user.point * 1 + this.state.addpoint * 1
        });
        this.setState({ ...this.state, showChargePoint: false, addpoint: '' });
        alert('Done!');
        window.location.reload();
    };

    componentDidMount() {
        AOS.init({ duration: 700 });
        this.props
            .onGetUserList()
            .then(res => {
                this.setState({
                    ...this.state,
                    user_loaded: true
                });
            })
            .catch(error => {
                this.props.history.push('/home');
            });
        this.props.onGetReceptionList().then(res => {
            this.setState({
                ...this.state,
                reception_loaded: true
            });
        });
    }

    render() {
        //console.log(this.props);
        if (
            this.state.user_loaded === true &&
            this.state.reception_loaded === true
        ) {
            var tags = null;
            var point = null;
            var nickname = null;
            var { adpost_user_list } = this.props;
            var own_article = [];
            var participated_article = [];
            var reception_table = null;
            if (this.props.user) {
                point = this.props.user.point;
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
            //console.log(own_article, participated_article)
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
                    <Modal
                        show={this.state.showChargePoint}
                        onHide={() => {
                            if (
                                window.confirm('Are you sure you want to quit?')
                            ) {
                                this.setState({
                                    ...this.state,
                                    showChargePoint: false,
                                    addpoint: ''
                                });
                            }
                        }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Charge Point</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group" align="left">
                                <p className="label-tag" align="left">
                                    Current Point
                                </p>
                                <text className="form-fixed" id="point">
                                    {point}
                                </text>
                            </div>
                            <div className="form-group" align="left">
                                <p className="label-tag" align="left">
                                    Charge
                                </p>
                                <input
                                    min="1"
                                    className="form-fixed"
                                    id="chargepoint"
                                    value={this.state.addpoint}
                                    onChange={e => {
                                        const re = /^[0-9]*$/;
                                        if (
                                            (e.target.value == '' ||
                                                re.test(e.target.value)) &&
                                            Number(e.target.value) + point <
                                                2100000000
                                        ) {
                                            this.setState({
                                                ...this.state,
                                                addpoint: e.target.value
                                            });
                                        } else if (
                                            Number(e.target.value) + point >=
                                            2100000000
                                        ) {
                                            alert(
                                                'cannot charge more than 2 bilion'
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-group" align="left">
                                <p className="label-tag" align="left">
                                    Point Expected
                                </p>
                                <text className="form-fixed" id="point">
                                    {point * 1 + this.state.addpoint * 1}
                                </text>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                id="charge-confirm"
                                variant="primary"
                                onClick={this.chargePointFinishHandler}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <section className="user-info-box section-wrapper">
                        <div className="Avatar">
                            <Image
                                id="UserInfoImage"
                                className="img-responsive"
                                src={
                                    this.props.user.avatar
                                        ? this.props.user.avatar
                                        : ''
                                }
                                width="65px"
                                height="65px"
                                roundedCircle
                            />
                        </div>
                        <div className="user-info-text" id="userinfo-titlebox">
                            <div className="main-user-wrapper">
                                <h1 className="title-text" id="userinfo_title">
                                    Hello, {nickname}
                                </h1>
                                <h2 className="user-name-aggregated">
                                    {this.props.user.first_name}{' '}
                                    {this.props.user.last_name}∙
                                    {this.props.user.email}
                                </h2>
                            </div>
                            {tags}
                            <div className="point-state-wrapper">
                                <h2 className="color-black">
                                    현재 보유한 포인트 &nbsp;&nbsp;
                                </h2>
                                <h2 id="point-integer">
                                    {this.props.user.point}
                                    <FontAwesomeIcon
                                        icon={faChargingStation}
                                        className="small-btn hover-btn"
                                        color="#7a7a7a"
                                        id="user-charge-btn"
                                        onClick={this.userChargeHandler}
                                    />
                                </h2>
                            </div>
                            <div className="edit-user-wrapper">
                                <h2 className="color-black">
                                    유저 정보 수정하기&nbsp;&nbsp;
                                </h2>
                                <FontAwesomeIcon
                                    icon={faUserEdit}
                                    className="small-btn hover-btn"
                                    color="#7a7a7a"
                                    id="user-edit-btn"
                                    onClick={this.userEditHandler}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="adlist-box section-wrapper">
                        <div className="AdList">
                            <PreviewList
                                articles={own_article.slice(0, 2)}
                                list_title={'Your Request'}
                                query={'owner'}
                                query_type={'special'}
                                compact={true}
                            />
                            <PreviewList
                                articles={participated_article.slice(0, 2)}
                                list_title={'Participating'}
                                query={'participant'}
                                query_type={'special'}
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
        updatePoint: point => dispatch(userActions.updatePoint(point)),
        onGetReceptionList: () =>
            dispatch(adreceptionActions.getReceptionByUser())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
