import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import { history } from '../../store';
import { tagActions, userActions } from '../../store/actions';
import avatar from '../../assets/avatar.png';
import './UserDetail.css';

class UserDetail extends Component {
    state = {
        user: { first_name: '', last_name: '', nickname: '', tags: [] },
        password: {
            current_password: '',
            new_password: '',
            new_password_check: ''
        },
        showChangePW: false,
        showChargePoint: false,
        addpoint: 0
    };

    componentDidMount() {
        this.props.onTagReload();
        this.props.reloadUser().then(res => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    first_name: res.user.first_name,
                    last_name: res.user.last_name,
                    nickname: res.user.nickname,
                    tags: res.user.tags.map(str => ({ name: str }))
                }
            });
        });
    }

    changePWHandler = () => this.setState({ showChangePW: true });
    changePWFinishHandler = () => {
        localStorage.setItem('logged_in', 'false');
        this.props.changePW(this.state.password);
        history.push('/signin');
    };

    chargePointHandler = () => this.setState({ showChargePoint: true });

    chargePointFinishHandler = () => {
        this.props.updatePoint({
            point: this.props.user.point * 1 + this.state.addpoint * 1
        });
        this.setState({ showChargePoint: false });
        alert('Done!');
        window.location.reload();
    };

    saveChangesHandler = () => {
        const user = {
            nickname: this.state.user.nickname,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            tags: this.state.user.tags.map(str => str.name)
        };
        this.props.putUser(user);
        alert('Saved!');
        window.location.reload();
    };

    withdrawalHandler = () => {
        alert('Noooo.....');
    };

    deleteTagHandler = i => {
        const tags = this.state.user.tags.slice(0);
        tags.splice(i, 1);
        this.setState({
            ...this.state,
            user: { ...this.state.user, tags: tags }
        });
    };

    addTagHandler = tag => {
        const tags = [].concat(this.state.user.tags, tag);
        this.setState({
            ...this.state,
            user: { ...this.state.user, tags: tags }
        });
    };

    imageChangeHandler = () => {
        alert('image clicked');
    };

    render() {
        var point = null;
        var pic = null;
        var email = null;
        if (this.props.user) {
            point = this.props.user.point;
            pic = this.props.user.avatar ? this.props.user.avatar : avatar;
            email = this.props.user.email;
        }
        return (
            <div className="UserDetail">
                <Modal
                    show={this.state.showChangePW}
                    onHide={this.changePWFinishHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group" align="left">
                            <p className="label-tag" align="left">
                                Current Password
                            </p>
                            <input
                                type="password"
                                className="form-fixed"
                                id="password"
                                value={this.state.password.current_password}
                                onChange={event => {
                                    this.setState({
                                        ...this.state,
                                        password: {
                                            ...this.state.password,
                                            current_password: event.target.value
                                        }
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group" align="left">
                            <p className="label-tag" align="left">
                                New Password
                            </p>
                            <input
                                type="password"
                                className="form-fixed"
                                id="new-password"
                                value={this.state.password.new_password}
                                onChange={event =>
                                    this.setState({
                                        ...this.state,
                                        password: {
                                            ...this.state.password,
                                            new_password: event.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                        <div className="form-group" align="left">
                            <p className="label-tag" align="left">
                                New Password Again
                            </p>
                            <input
                                type="password"
                                className="form-fixed"
                                id="new-password-check"
                                value={this.state.password.new_password_check}
                                onChange={event =>
                                    this.setState({
                                        ...this.state,
                                        password: {
                                            ...this.state.password,
                                            new_password_check:
                                                event.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            id="password-confirm"
                            variant="primary"
                            onClick={this.changePWFinishHandler}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showChargePoint}
                    onHide={this.chargePointFinishHandler}>
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
                                type="number"
                                min="1"
                                className="form-fixed"
                                id="chargepoint"
                                onChange={event =>
                                    this.setState({
                                        ...this.state,
                                        addpoint: event.target.value
                                    })
                                }
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

                <h2 className="UserInfoTitle">User Info</h2>
                <div className="avatar">
                    <img
                        src={pic}
                        className="Avatar"
                        onClick={this.imageChangeHandler}
                    />
                </div>
                <div className="form-group" align="left">
                    <p className="label-tag" align="left">
                        Email
                    </p>
                    <text className="form-fixed" id="email">
                        {email}
                    </text>
                </div>
                <div className="form-group">
                    <p className="label-tag" align="left">
                        Nickname
                    </p>
                    <input
                        className="form-control"
                        id="nickname"
                        type="text"
                        value={this.state.user.nickname}
                        onChange={event =>
                            this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    nickname: event.target.value
                                }
                            })
                        }
                    />
                </div>
                <table>
                    <td>
                        <div className="form-group">
                            <p className="label-tag" align="left">
                                First Name
                            </p>
                            <input
                                className="form-control"
                                id="fname"
                                type="text"
                                value={this.state.user.first_name}
                                onChange={event =>
                                    this.setState({
                                        ...this.state,
                                        user: {
                                            ...this.state.user,
                                            first_name: event.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <p className="label-tag" align="left">
                                Last Name
                            </p>
                            <input
                                className="form-control"
                                id="lname"
                                type="text"
                                value={this.state.user.last_name}
                                onChange={event =>
                                    this.setState({
                                        ...this.state,
                                        user: {
                                            ...this.state.user,
                                            last_name: event.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                    </td>
                </table>
                <div className="tagSelect">
                    <p className="input-tag" align="left">
                        Tags
                    </p>
                    <ReactTags
                        tags={this.state.user.tags}
                        suggestions={this.props.allTags}
                        handleDelete={this.deleteTagHandler}
                        handleAddition={this.addTagHandler}
                        allowNew={false}
                        minQueryLength={1}
                    />
                </div>
                <div className="form-group" align="left">
                    <p className="label-tag" align="left">
                        Points Available
                    </p>
                    <text className="form-fixed" id="point">
                        {point}
                    </text>
                </div>
                <div className="form-group" align="left">
                    <ListGroup id="UserFunctList">
                        <ListGroup.Item
                            action
                            variant="light"
                            onClick={this.chargePointHandler}>
                            <h6>Charge Point</h6>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            variant="light"
                            onClick={this.changePWHandler}>
                            <h6>Change Password</h6>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            variant="light"
                            onClick={this.saveChangesHandler}>
                            <h6>Save Changes</h6>
                        </ListGroup.Item>
                    </ListGroup>
                    <p className="form-select" align="right">
                        <a
                            id="withdrawal"
                            href="#"
                            onClick={this.withdrawalHandler}>
                            Withrawal
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        allTags: state.tag.all_tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reloadUser: () => dispatch(userActions.getUser()),
        putUser: user => dispatch(userActions.putUser(user)),
        changePW: pw => dispatch(userActions.changePW(pw)),
        updatePoint: point => dispatch(userActions.updatePoint(point)),
        onTagReload: () => dispatch(tagActions.getAllTag())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetail);
