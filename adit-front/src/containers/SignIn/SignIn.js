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
import './SignIn.css';
import avatar from '../../assets/avatar.png';
import * as actionCreators from '../../store/actions/user.action';

class SignIn extends Component {
    componentDidMount() {
        if (localStorage.getItem('logged_in') === 'true') {
            this.props.history.push('/home');
        }
    }

    componentDidUpdate() {
        if (localStorage.getItem('logged_in') === 'true') {
            this.props.history.push('/home');
        }
    }

    state = {
        email: '',
        password: '',
        name: '',
        storedUsers: {
            email: 'csh3695@naver.com',
            password: 'ihateswpp',
            name: 'Kent',
            logged_in: true
        }
    };

    SignInHandler = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.onsignIn(user);
    };
    SignUpHandler = () => {
        this.props.history.push('/signup');
    };
    render() {
        return (
            <div className="SignIn">
                <div className="SignInForm">
                    <div className="avatar">
                        <img src={avatar} className="Avatar" />
                    </div>
                    <h2 className="text-center">Sign In!</h2>
                    <div className="form-group">
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
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            button
                            id="signin-button"
                            onClick={() => this.SignInHandler()}
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="clearfix">
                        <label clasName="Remember">
                            <input type="checkbox" id="remember-chkbox" />{' '}
                            Remember me
                        </label>
                        <a href="#" className="ForgotPW" id="findpw-link">
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <p className="text-center small">
                    Don't have an account?{' '}
                    <a
                        href="#"
                        id="signup-link"
                        onClick={() => this.SignUpHandler()}
                    >
                        Sign up here!
                    </a>
                </p>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onsignIn: user => dispatch(actionCreators.signIn(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
