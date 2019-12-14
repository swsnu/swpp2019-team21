import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import { history } from '../../store';
import { Spinner } from 'react-bootstrap';
import { tagActions, userActions } from '../../store/actions';
import avatar from '../../assets/avatar.png';
import './UserDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

class UserDetail extends Component {
    state = {
        is_loaded: false,
        user: {
            first_name: '',
            last_name: '',
            nickname: '',
            tags: [],
            avatar: null
        },
        userImage: null,
        userImageURL: null,
        password: {
            current_password: '',
            new_password: '',
            new_password_check: ''
        },
        showChangePW: false,
        showChargePoint: false,
        showChangeImage: false,
        addpoint: '',
        valid: {
            fname: true,
            lname: true,
            nickname: true
        }
    };

    componentDidMount() {
        this.props.onTagReload();
        this.props.reloadUser().then(res => {
            if (!res) {
                window.location.assign('/home');
                return;
            } else {
                this.setState({
                    ...this.state,
                    user: {
                        ...this.state.user,
                        first_name: res.user.first_name,
                        last_name: res.user.last_name,
                        nickname: res.user.nickname,
                        tags: res.user.tags.map(str => ({ name: str }))
                    },
                    is_loaded: true
                });
            }
        });
    }

    changePWHandler = () =>
        this.setState({ ...this.state, showChangePW: true });
    changePWFinishHandler = () => {
        this.props.changePW(this.state.password);
        alert('please signin again');
        history.push('/signin');
    };

    chargePointHandler = () =>
        this.setState({ ...this.state, showChargePoint: true });

    chargePointFinishHandler = () => {
        this.props.updatePoint({
            point: this.props.user.point * 1 + this.state.addpoint * 1
        });
        this.setState({ ...this.state, showChargePoint: false, addpoint: '' });
        alert('Done!');
        window.location.reload();
    };

    saveChangesHandler = () => {
        const user = {
            nickname: this.state.user.nickname,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            tags: this.state.user.tags.map(str => str.name),
            avatar: this.state.user.avatar
        };
        const { valid } = this.state;

        if (valid.fname && valid.lname && valid.nickname) {
            this.props.putUser(user);
            alert('Saved!');
            window.location.assign('/mypage');
        } else {
            alert('Infos not valid');
        }
    };

    chargeImageFinishHandler = () => {
        if (!this.state.userImageURL) {
            if (
                !window.confirm(
                    'Your thumbnail will not be changed if thumbnail is not uploaded'
                )
            ) {
                return;
            }
        } else if (!this.state.userImage.name.match(/.(jpg|jpeg|png)$/i)) {
            alert('You should upload image file');
            return;
        } else if (this.state.userImage.size > 500000) {
            alert('The file cannot be bigger than 500kB');
            return;
        }
        const user = { ...this.props.user, avatar: this.state.userImageURL };
        this.props.putUser(user);
        alert('Saved!');
        window.location.reload();
    };

    withdrawalHandler = () => {
        alert('Not implemented yet');
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

    handleValidate = tag => {
        return (
            !this.state.postTag.map(item => item.name).includes(tag.name) &&
            this.state.postTag.length <= 20
        );
    };

    imageChangeHandler = () => {
        this.setState({ ...this.state, showChangeImage: true });
    };

    currentPasswordChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                password: {
                    ...this.state.password,
                    current_password: e.target.value
                }
            });
        } else {
            alert('password must be shorter than 30 characters');
        }
    };

    newPasswordChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                password: {
                    ...this.state.password,
                    new_password: e.target.value
                }
            });
        } else {
            alert('password must be shorter than 30 characters');
        }
    };

    passwordCheckChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                password: {
                    ...this.state.password,
                    new_password_check: e.target.value
                }
            });
        } else {
            alert('password must be shorter than 30 characters');
        }
    };

    imageOnChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                ...this.state,
                userImage: file,
                userImageURL: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    render() {
        var point = null;
        var pic = null;
        var email = null;
        if (this.props.user) {
            point = this.props.user.point;
            pic = this.state.user.avatar ? this.state.user.avatar : avatar;
            email = this.props.user.email;
        }
        if (this.state.is_loaded) {
            return (
                <div className="UserDetail">
                    <Modal
                        show={this.state.showChangePW}
                        onHide={() => {
                            if (
                                window.confirm('Are you sure you want to quit?')
                            ) {
                                this.setState({
                                    ...this.state,
                                    password: {
                                        current_password: '',
                                        new_password: '',
                                        new_password_check: ''
                                    },
                                    showChangePW: false
                                });
                            }
                        }}>
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
                                    onChange={this.currentPasswordChangeHandler}
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
                                    onChange={this.newPasswordChangeHandler}
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
                                    value={
                                        this.state.password.new_password_check
                                    }
                                    onChange={this.passwordCheckChangeHandler}
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
                    <Modal
                        show={this.state.showChangeImage}
                        onHide={() => {
                            if (
                                window.confirm('Are you sure you want to quit?')
                            ) {
                                this.setState({
                                    ...this.state,
                                    userImage: null,
                                    userImageURL: null,
                                    showChangeImage: false
                                });
                            }
                        }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Thumbnail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                className="form-control"
                                type="file"
                                id="post-thumbnail-input"
                                multiple={false}
                                onChange={this.imageOnChange}
                            />
                            {this.state.userImageURL && (
                                <img
                                    id="user-profile-preview"
                                    src={this.state.userImageURL}
                                />
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                id="charge-confirm"
                                variant="primary"
                                onClick={this.chargeImageFinishHandler}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <h2 className="UserInfoTitle">User Info</h2>
                    <div className="avatar">
                        <img
                            src={
                                this.props.user.avatar
                                    ? this.props.user.avatar
                                    : avatar
                            }
                            className="Avatar"
                            onClick={this.imageChangeHandler}
                        />
                        <div
                            id="avatar-change-btn"
                            onClick={this.imageChangeHandler}>
                            <FontAwesomeIcon
                                id="avatar-change-icon"
                                icon={faCamera}
                                color="#7a7a7a"
                                size="1x"
                            />
                        </div>
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
                            id={
                                `nickname` +
                                (this.state.valid.nickname === false
                                    ? '-invalid'
                                    : '')
                            }
                            type="text"
                            required="required"
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
                            onBlur={event => {
                                let valid = !!this.state.user.nickname;
                                this.setState({
                                    ...this.state,
                                    valid: {
                                        ...this.state.valid,
                                        nickname: valid
                                    }
                                });
                            }}
                        />
                        <p id="input-warning" align="left">
                            {this.state.valid.nickname === false
                                ? '1-20 characters'
                                : ''}{' '}
                            &nbsp;
                        </p>
                    </div>
                    <table>
                        <td>
                            <div className="form-group">
                                <p className="label-tag" align="left">
                                    First Name
                                </p>
                                <input
                                    className="form-control"
                                    id={
                                        `fname` +
                                        (this.state.valid.fname === false
                                            ? '-invalid'
                                            : '')
                                    }
                                    type="text"
                                    value={this.state.user.first_name}
                                    required="required"
                                    onChange={event => {
                                        this.setState({
                                            ...this.state,
                                            user: {
                                                ...this.state.user,
                                                first_name: event.target.value
                                            }
                                        });
                                    }}
                                    onBlur={event => {
                                        let valid = !!this.state.user
                                            .first_name;
                                        this.setState({
                                            ...this.state,
                                            valid: {
                                                ...this.state.valid,
                                                fname: valid
                                            }
                                        });
                                    }}
                                />
                                <p id="input-warning" align="left">
                                    {this.state.valid.fname === false
                                        ? '1-20 characters'
                                        : ''}{' '}
                                    &nbsp;
                                </p>
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <p className="label-tag" align="left">
                                    Last Name
                                </p>
                                <input
                                    className="form-control"
                                    id={
                                        `lname` +
                                        (this.state.valid.lname === false
                                            ? '-invalid'
                                            : '')
                                    }
                                    type="text"
                                    required="required"
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
                                    onBlur={event => {
                                        let valid = !!this.state.user.last_name;
                                        this.setState({
                                            ...this.state,
                                            valid: {
                                                ...this.state.valid,
                                                lname: valid
                                            }
                                        });
                                    }}
                                />
                                <p id="input-warning" align="left">
                                    {this.state.valid.lname === false
                                        ? '1-20 characters'
                                        : ''}{' '}
                                    &nbsp;
                                </p>
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
                            // handleValidate={this.handleValidate}
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
