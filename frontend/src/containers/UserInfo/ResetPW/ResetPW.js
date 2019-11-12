import React, { Component } from 'react';
import './ResetPW.css';
import background from '../../../assets/userinfo_background.jpg';
import { history } from '../../../store';

class ResetPW extends Component {
    state = { password: null, password_valid: null };

    confirmResetHandler() {
        alert('Done!');
        history.push('/home');
    }

    render() {
        return (
            <div className="ResetPW">
                <img src={background} id="title-background" />
                <div className="ResetTitle" id="resetpw-title">
                    <ttl>Reset Password</ttl>
                </div>
                <div className="ResetPWForm">
                    <div className="form-group">
                        <p className="input-tag" align="left">
                            Password
                        </p>
                        <input
                            className="form-control"
                            id="new-pw-input"
                            type="password"
                            value={this.state.password}
                            onChange={event =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <p className="input-tag" align="left">
                            Password Again
                        </p>
                        <input
                            className="form-control"
                            id="new-pw-input"
                            type="password"
                            value={this.state.password_valid}
                            onChange={event =>
                                this.setState({
                                    password_valid: event.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            button
                            id="confirm-reset"
                            onClick={() => this.confirmResetHandler()}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPW;
