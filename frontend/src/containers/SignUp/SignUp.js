import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';
import { userActions } from '../../store/actions';
import avatar from '../../assets/avatar.png';
import './SignUp.css';
import { tagActions } from '../../store/actions/tag.action';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        password_check: '',
        fname: '',
        lname: '',
        nickname: '',
        tags: [],
        postFile: null,
        valid: {
            email: true,
            password_check: true,
            nickname: true
        }
    };

    componentDidMount() {
        this.props.getAllTags();
    }

    handleValidate = tag => {
        return (
            !this.state.tags.map(item => item.name).includes(tag.name) &&
            this.state.tags.length <= 20
        );
    };

    signUpHandler = () => {
        if (this.state.password.toString().length < 8) {
            alert('password should be longer than 7 alphabets');
            return;
        } else if (this.state.password_check !== this.state.password) {
            alert('password_check different with password');
            this.setState({ ...this.state, password_check: '' });
            return;
        } else if (this.state.lname === '') {
            alert('last name section cannot be empty');
            return;
        } else if (this.state.nickname === '') {
            alert('nickname cannot be empty');
            return;
        } else if (this.state.email === '') {
            alert('email cannot be empty');
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

    emailChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                email: e.target.value
            });
        } else {
            alert('email must be shorter than 30 characters');
        }
    };

    passwordChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                password: e.target.value
            });
        } else {
            alert('password must be shorter than 30 characters');
        }
    };

    passwordCheckChangeHandler = e => {
        if (e.target.value.length <= 30) {
            this.setState({
                ...this.state,
                password_check: e.target.value
            });
        } else {
            alert('password must be shorter than 30 characters');
        }
    };

    fnameChangeHandler = e => {
        if (e.target.value.length <= 20) {
            this.setState({
                ...this.state,
                fname: e.target.value
            });
        } else {
            alert('first name must be shorter than 20 characters');
        }
    };

    lnameChangeHandler = e => {
        if (e.target.value.length <= 20) {
            this.setState({
                ...this.state,
                lname: e.target.value
            });
        } else {
            alert('last name must be shorter than 20 characters');
        }
    };

    nicknameChangeHandler = e => {
        if (e.target.value.length <= 20) {
            this.setState({
                ...this.state,
                nickname: e.target.value
            });
        } else {
            alert('nickname must be shorter than 20 characters');
        }
    };

    /*    passwordCheckerHandler = () => {
        // TODO Inputbox Get Red
    };*/

    render() {
        //console.log(this.props.allTags);
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
                                this.state.valid.email ? '' : '-unvalid'
                            }`}
                            id="email-input"
                            type="text"
                            value={this.state.email}
                            required="required"
                            onChange={this.emailChangeHandler}
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
                            onChange={this.passwordChangeHandler}
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
                            onChange={this.passwordCheckChangeHandler}
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
                                    onChange={this.fnameChangeHandler}
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
                                    onChange={this.lnameChangeHandler}
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
                            id="nickname"
                            value={this.state.nickname}
                            required="required"
                            onChange={this.nicknameChangeHandler}
                        />
                    </div>
                    <div className="tagSelect">
                        <p className="input-tag" align="left">
                            Tags
                        </p>
                        <ReactTags
                            tags={this.state.tags}
                            id="reacttags"
                            suggestions={this.props.allTags}
                            handleDelete={this.deleteTagHandler.bind()}
                            handleAddition={this.addTagHandler.bind()}
                            handleValidate={this.handleValidate.bind()}
                            allowNew={false}
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

const mapStateToProps = state => {
    return {
        allTags: state.tag.all_tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: user => dispatch(userActions.signUp(user)),
        getAllTags: () => dispatch(tagActions.getAllTag())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
