import React, { Component } from 'react';
import {
    Modal,
    Button,
    ListGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import './UserDetail.css';
import * as actionCreators from '../../store/actions/user.action';
import avatar from '../../assets/avatar.png';

class UserDetail extends Component {
    state = {
        user: { first_name: '', last_name: '', nickname: '', tags: [] },
        password: {
            current_password:'',
            new_password:'',
            new_password_check:'',
        },
        showChangePW: false,
        showChargePoint: false,
        addpoint: 0
    };
    componentDidMount() {
        this.props.reloadUser()
            .then(res => { this.setState({
                ...this.state,
                user:{
                    ...this.state.user,
                    first_name: res.user.first_name,
                    last_name: res.user.last_name,
                    nickname: res.user.nickname,
                    tags: res.user.tags.map(str => ({name:str})),
                }
            })
            console.log(res)
            console.log(res.user.tags.map(str => ({name:str})))
        })
    }
    changePWHandler = () => this.setState({ showChangePW: true });
    changePWFinishHandler = () => {
        this.props.changePW(this.state.password)
        alert('Done!');
        this.setState({ showChangePW: false });
    };
    chargePointHandler = () => this.setState({ showChargePoint: true });
    chargePointFinishHandler = () => {
        this.props.updatePoint({point:this.props.user.point * 1 + this.state.addpoint * 1})
        this.setState({ showChargePoint: false });
        alert('Done!');
        
    };
    saveChangesHandler = () => {    
        console.log(this.state.user)
        const user = {
            nickname: this.state.user.nickname, 
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            tags: this.state.user.tags.map(str => str.name)
        }
        this.props.putUser(user)
        alert('Saved!');
    };
    withdrawalHandler = () => {
        alert('Noooo.....');
    };
    deleteTagHandler = i => {
        const tags = this.state.user.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ ...this.state, user:{...this.state.user, tags: tags}});
    };

    addTagHandler = tag => {
        const tags = [].concat(this.state.user.tags, tag);
        this.setState({ ...this.state, user:{...this.state.user, tags: tags}});
        console.log(this.state.user.tags)
    };

    render() {
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
                                onChange={event => this.setState({
                                    ...this.state,
                                    password:{
                                        ...this.state.password,
                                        current_password:event.target.value
                                    }
                                })}
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
                                onChange={event => this.setState({
                                    ...this.state,
                                    password:{
                                        ...this.state.password,
                                        new_password:event.target.value
                                    }
                                })}
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
                                onChange={event => this.setState({
                                    ...this.state,
                                    password:{
                                        ...this.state.password,
                                        new_password_check:event.target.value
                                    }
                                })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
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
                                {this.props.user.point}
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
                                {this.props.user.point * 1 + this.state.addpoint * 1}
                            </text>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={this.chargePointFinishHandler}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <h2 className="UserInfoTitle">User Info</h2>
                <div className="avatar">
                    <img
                        src={
                            this.props.user.pic
                                ? this.props.user.pic
                                : avatar
                        }
                        className="Avatar"
                    />
                </div>
                <div className="form-group" align="left">
                    <p className="label-tag" align="left">
                        Email
                    </p>
                    <text className="form-fixed" id="email">
                        {this.props.user.email}
                    </text>
                </div>
                <div className="form-group">
                    <p className="label-tag" align="left">
                        Nickname
                    </p>
                    <input
                        className="form-control"
                        id="fname"
                        type="text"
                        value={this.state.user.nickname}
                        onChange={event =>
                            this.setState({...this.state, user: { ...this.state.user, nickname: event.target.value }})
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
                                    this.setState({...this.state, user: { ...this.state.user, first_name: event.target.value }})
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
                                    this.setState({...this.state, user: { ...this.state.user, last_name: event.target.value }})
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
                            allowNew={true}
                            minQueryLength={1}
                        />
                </div>
                <div className="form-group" align="left">
                    <p className="label-tag" align="left">
                        Points Available
                    </p>
                    <text className="form-fixed" id="point">
                        {this.props.user.point}
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
                        <a href="#" onClick={this.withdrawalHandler}>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reloadUser: () => dispatch(actionCreators.getUser()),
        putUser: (user) => dispatch(actionCreators.putUser(user)),
        changePW: (pw) => dispatch(actionCreators.changePW(pw)),
        updatePoint: (point) => dispatch(actionCreators.updatePoint(point))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetail);