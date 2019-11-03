import React, { Component, Profiler } from 'react';
import {
    Modal,
    Button,
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
import { connect } from 'net';
import './UserDetail.css';
import avatar from '../../assets/avatar.png';

class UserDetail extends Component {
    state = {
        user: { first_name: 'John', last_name: 'Doe', nickname: 'john' },
        showChangePW: false,
        showChargePoint: false,
        addpoint: 0
    };
    componentDidMount() {
        this.setState({
            user: {
                ...this.state.user,
                first_name: this.props.first_name,
                last_name: this.props.last_name,
                nickname: this.props.nickname
            }
        });
    }
    changePWHandler = () => this.setState({ showChangePW: true });
    changePWFinishHandler = () => {
        this.setState({ showChangePW: false });
        alert('Done!');
    };
    chargePointHandler = () => this.setState({ showChargePoint: true });
    chargePointFinishHandler = () => {
        this.setState({ showChargePoint: false });
        alert('Done!');
    };
    saveChangesHandler = () => {
        alert('Saved!');
    };
    withdrawalHandler = () => {
        alert('Noooo.....');
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
                                {this.props.point}
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
                                {this.props.point * 1 + this.state.addpoint * 1}
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
                            this.props.profileimg
                                ? this.props.profileimg
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
                        {this.props.email}
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
                        defaultValue={this.props.nickname}
                        onChange={event =>
                            this.setState({
                                user: { nickname: event.target.value }
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
                                defaultValue={this.props.first_name}
                                onChange={event =>
                                    this.setState({
                                        user: { first_name: event.target.value }
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
                                defaultValue={this.props.last_name}
                                onChange={event =>
                                    this.setState({
                                        user: { last_name: event.target.value }
                                    })
                                }
                            />
                        </div>
                    </td>
                </table>
                <div className="form-group" align="left">
                    <p className="label-tag" align="left">
                        Points Available
                    </p>
                    <text className="form-fixed" id="point">
                        {this.props.point}
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

export default UserDetail;
