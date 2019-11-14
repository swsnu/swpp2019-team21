import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../store/actions";
import avatar from "../../assets/avatar.png";
import "./SignIn.css";

class SignIn extends Component {
  componentDidMount() {
    if (localStorage.getItem("logged_in") === "true") {
      this.props.history.push("/home");
    }
  }

  state = {
    email: "",
    password: ""
  };

  signInHandler = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onSignIn(user);
  };

  signUpHandler = () => {
    this.props.history.push("/signup");
  };

  forgotPasswordHandler = () => {
    // TODO:: Link to forgot Password
  };

  render() {
    return (
      <div className="sign-in">
        <div className="sign-in-form">
          <div className="avatar">
            <img src={avatar} className="sign-in-user-icon" />
          </div>
          <h2 className="text-center">Sign In!</h2>
          <div className="form-group">
            <input
              className="form-control"
              id="email-input"
              placeholder="Email"
              type="text"
              value={this.state.email}
              required="required"
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              id="pw-input"
              type="password"
              placeholder="Password"
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
              id="signin-button"
              onClick={() => this.signInHandler()}
            >
              Sign in
            </button>
          </div>
          <div className="clearfix">
            <label className="remember">
              <input type="checkbox" id="remember-chkbox" />
              Remember me
            </label>
            <a
              href="#"
              className="forgot-password"
              id="findpw-link"
              onClick={this.forgotPasswordHandler}
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <p className="text-center small">
          Don't have an account?{" "}
          <a href="#" id="signup-link" onClick={this.signUpHandler}>
            Sign up here!
          </a>
        </p>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onSignIn: user => dispatch(userActions.signIn(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
