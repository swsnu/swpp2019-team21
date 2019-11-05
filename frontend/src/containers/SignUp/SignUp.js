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
import './SignUp.css';
import ReactTags from 'react-tag-autocomplete';
import avatar from '../../assets/avatar.png';
import * as actionCreators from '../../store/actions/user.action';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        password_check: '',
        fname: '',
        lname: '',
        nickname: '',
        tags: [],
        valid: {
            email: true,
            password_check: true,
            nickname: true
        }
    };

    signUpHandler = () => {
        if (this.state.password.toString().length <= 8) {
            alert('password should be longer than 8 characters');
            return;
        } else if (this.state.password_check !== this.state.password) {
            alert('password_check different with password');
            this.setState({ ...this.state, password_check: '' });
            return;
        } else if (
            this.state.first_name === '' ||
            this.state.last_name === ''
        ) {
            alert('name section cannot be empty');
            return;
        } else if (this.state.nickname === '') {
            alert('nickname cannot be empty');
            return;
        }
        const user = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.fname,
            last_name: this.state.lname,
            nickname: this.state.nickname,
            tags: this.state.tags.map(item => item.name)
        };
        this.props.onSignUp(user);
        this.props.history.push();
        return;
    };

    deleteTagHandler = i => {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags: tags });
    };

    addTagHandler = tag => {
        const tags = [].concat(this.state.tags, tag);
        this.setState({ tags: tags });
    };

    passwordCheckerHandler = () => {
        // TODO Inputbox Get Red
    };

    render() {
        return (
            <div className="sign-up">
                <div className="sign-up-form">
                    <div className="avatar">
                        <img src={avatar} className="Avatar" />
                    </div>
                    <h2 className="text-center">Join Us:)</h2>
                    <div className="form-group">
                        <p
                            className={`input-tag${
                                this.state.valid.email ? '' : '-unvalid'
                            }`}
                            align="left">
                            Email Address{' '}
                            {this.state.valid.email
                                ? ''
                                : '(email already exists)'}
                        </p>
                        <input
                            className={`form-control${
                                this.state.valid.email ? '' : ''
                            }`}
                            id="email-input"
                            type="text"
                            value={this.state.email}
                            required="required"
                            onChange={event =>
                                this.setState({ email: event.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <p className="input-tag" align="left">
                            Password
                        </p>
                        <input
                            className="form-control"
                            id="pw-input"
                            type="password"
                            value={this.state.password}
                            required="required"
                            onChange={event =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <p
                            className={`input-tag-${this.state.valid.password_check}`}
                            align="left">
                            Password Check
                        </p>
                        <input
                            className="form-control"
                            id="pw-check"
                            type="password"
                            value={this.state.password_check}
                            required="required"
                            onChange={event =>
                                this.setState({
                                    password_check: event.target.value
                                })
                            }
                            onBlur={this.passwordCheckerHandler}
                        />
                    </div>
                    <table>
                        <td>
                            <div className="form-group">
                                <p className="input-tag" align="left">
                                    First Name
                                </p>
                                <input
                                    className="form-control"
                                    id="fname"
                                    type="text"
                                    value={this.state.fname}
                                    required="required"
                                    onChange={event =>
                                        this.setState({
                                            fname: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <p className="input-tag" align="left">
                                    Last Name
                                </p>
                                <input
                                    className="form-control"
                                    id="lname"
                                    type="text"
                                    value={this.state.lname}
                                    required="required"
                                    onChange={event =>
                                        this.setState({
                                            lname: event.target.value
                                        })
                                    }
                                />
                            </div>
                        </td>
                    </table>
                    <div className="form-group">
                        <p
                            className={`input-tag-${this.state.valid.nickname}`}
                            align="left">
                            Nickname
                        </p>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.nickname}
                            required="required"
                            onChange={event =>
                                this.setState({ nickname: event.target.value })
                            }
                        />
                    </div>
                    <div className="tagSelect">
                        <p className="input-tag" align="left">
                            Tags
                        </p>
                        <ReactTags
                            tags={this.state.tags}
                            suggestions={this.props.allTags}
                            handleDelete={this.deleteTagHandler}
                            handleAddition={this.addTagHandler}
                            allowNew={true}
                            minQueryLength={1}
                        />
                    </div>
                    <div className="checkterm">
                        <label className="Term">
                            <input type="checkbox" id="haveread-chkbox" /> I
                            have read and agree to the{' '}
                            <a href="#">terms of service</a>
                        </label>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            id="signup-button"
                            onClick={this.signUpHandler}>
                            Sign up!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = status => {
    return {
        allTags: status.tag.all_tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: user => dispatch(actionCreators.signUp(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
