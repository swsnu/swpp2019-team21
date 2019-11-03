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
        mockSuggestion: [
            { id: 3, name: 'Bananas' },
            { id: 4, name: 'Mango' },
            { id: 5, name: 'Lemons' },
            { id: 6, name: 'Apricots' }
        ]
    };
    SignupHandler = () => {
        alert('Welcome!');
        const user = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.fname,
            last_name: this.state.lname,
            nickname: this.state.nickname,
            tags: this.state.tags
        };
        this.props.onsignUp(user);
        this.props.history.push('/signin');
        return;
    };
    handleDelete = i => {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags: tags });
    };
    handleAddition = tag => {
        const tags = [].concat(this.state.tags, tag);
        this.setState({ tags: tags });
    };
    render() {
        return (
            <div className="SignUp">
                <div className="SignUpForm">
                    <div className="avatar">
                        <img src={avatar} className="Avatar" />
                    </div>
                    <h2 className="text-center">Join Us:)</h2>
                    <div className="form-group">
                        <p className="input-tag" align="left">
                            Email Address
                        </p>
                        <input
                            className="form-control"
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
                        <p className="input-tag" align="left">
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
                        <p className="input-tag" align="left">
                            Nickname
                        </p>
                        <input
                            className="form-control"
                            id="email-input"
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
                            suggestions={this.state.mockSuggestion}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            allowNew={true}
                            minQueryLength={1}
                        />
                    </div>
                    <div className="checkterm">
                        <label clasName="Term">
                            <input type="checkbox" id="haveread-chkbox" /> I
                            have read and agree to the{' '}
                            <a href="#">terms of service</a>
                        </label>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            button
                            id="signup-button"
                            onClick={() => this.SignupHandler()}>
                            Sign up!
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onsignUp: user => dispatch(actionCreators.signUp(user))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SignUp);
