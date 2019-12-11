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
        read_check: false,
        postFile: null,
        valid: {
            email: null,
            password: null,
            nickname: null,
            fname: null,
            lname: null
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
        if (!this.state.valid.email) {
            alert('Invalid e-mail address.');
            return;
        } else if (!this.state.valid.password) {
            alert('Password must consist of 8-20 characters.');
            return;
        } else if (this.state.password != this.state.password_check) {
            alert('Must match password.');
            return;
        } else if (!this.state.valid.fname) {
            alert('First name must consist of 1-20 characters.');
            return;
        } else if (!this.state.valid.lname) {
            alert('Last name must consist of 1-20 characters.');
            return;
        } else if (!this.state.valid.nickname) {
            alert('Nickname must consist of 1-20 characters.');
            return;
        } else if (!this.state.read_check) {
            alert('Please read and agree with terms of service');
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
        var reg = new RegExp(/^[^@\s]+@[^@\s.]+\.[a-zA-Z]+$/);
        var valid = e.target.value.length <= 30 && reg.test(e.target.value);
        this.setState({
            ...this.state,
            email: e.target.value,
            valid: {
                ...this.state.valid,
                email: valid
            }
        });
    };

    passwordChangeHandler = e => {
        var valid = e.target.value.length >= 8 && e.target.value.length <= 30;
        this.setState({
            ...this.state,
            password: e.target.value,
            valid: {
                ...this.state.valid,
                password: valid
            }
        });
    };

    passwordCheckChangeHandler = e => {
        this.setState({
            ...this.state,
            password_check: e.target.value
        });
    };

    fnameChangeHandler = e => {
        var valid = e.target.value.length <= 20 && e.target.value.length > 0;
        this.setState({
            ...this.state,
            fname: e.target.value,
            valid: {
                ...this.state.valid,
                fname: valid
            }
        });
    };

    lnameChangeHandler = e => {
        var valid = e.target.value.length <= 20 && e.target.value.length > 0;
        this.setState({
            ...this.state,
            lname: e.target.value,
            valid: {
                ...this.state.valid,
                lname: valid
            }
        });
    };

    nicknameChangeHandler = e => {
        var valid = e.target.value.length <= 20 && e.target.value.length > 0;
        this.setState({
            ...this.state,
            nickname: e.target.value,
            valid: {
                ...this.state.valid,
                nickname: valid
            }
        });
    };

    checkBoxHandler = e => {
        this.setState({
            ...this.state,
            read_check: e.target.checked
        });
    };

    /*    passwordCheckerHandler = () => {
        // TODO Inputbox Get Red
    };*/

    render() {
        //console.log(this.state.read_check);
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
                                this.state.valid.email === false
                                    ? '-invalid'
                                    : ''
                            }`}
                            align="left">
                            Email Address{' '}
                        </p>
                        <input
                            className="form-control"
                            id={
                                `email-input` +
                                (this.state.valid.email === false
                                    ? '-invalid'
                                    : '')
                            }
                            type="text"
                            value={this.state.email}
                            required="required"
                            onChange={this.emailChangeHandler}
                        />
                        <p id="input-warning" align="left">
                            {this.state.valid.email === false
                                ? 'Invalid email form'
                                : ''}{' '}
                            &nbsp;
                        </p>
                    </div>
                    <div className="form-group">
                        <p className="input-tag" align="left">
                            Password
                        </p>
                        <input
                            className="form-control"
                            id={
                                'pw-input' +
                                (this.state.valid.password === false
                                    ? '-invalid'
                                    : '')
                            }
                            type="password"
                            value={this.state.password}
                            required="required"
                            onChange={this.passwordChangeHandler}
                        />
                        <p id="input-warning" align="left">
                            {this.state.valid.password === false
                                ? 'Must consist of 8-20 characters'
                                : ''}{' '}
                            &nbsp;
                        </p>
                    </div>
                    <div className="form-group">
                        <p
                            className={`input-tag-${this.state.valid.password_check}`}
                            align="left">
                            Password Check
                        </p>
                        <input
                            className="form-control"
                            id={
                                `pw-check` +
                                (this.state.password ===
                                this.state.password_check
                                    ? ''
                                    : '-invalid')
                            }
                            type="password"
                            value={this.state.password_check}
                            required="required"
                            onChange={this.passwordCheckChangeHandler}
                            onBlur={this.passwordCheckerHandler}
                        />
                        <p id="input-warning" align="left">
                            {this.state.password !== this.state.password_check
                                ? 'Must match password'
                                : ''}{' '}
                            &nbsp;
                        </p>
                    </div>
                    <table>
                        <td>
                            <div className="form-group">
                                <p className="input-tag" align="left">
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
                                    value={this.state.fname}
                                    required="required"
                                    onChange={this.fnameChangeHandler}
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
                                <p className="input-tag" align="left">
                                    Last Name
                                </p>
                                <input
                                    className="form-control"
                                    id={
                                        'lname' +
                                        (this.state.valid.lname === false
                                            ? '-invalid'
                                            : '')
                                    }
                                    type="text"
                                    value={this.state.lname}
                                    required="required"
                                    onChange={this.lnameChangeHandler}
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
                    <div className="form-group">
                        <p
                            className={`input-tag-${this.state.valid.nickname}`}
                            align="left">
                            Nickname
                        </p>
                        <input
                            className="form-control"
                            type="text"
                            id={
                                'nickname' +
                                (this.state.valid.nickname === false
                                    ? '-invalid'
                                    : '')
                            }
                            value={this.state.nickname}
                            required="required"
                            onChange={this.nicknameChangeHandler}
                        />
                        <p id="input-warning" align="left">
                            {this.state.valid.nickname === false
                                ? '1-20 characters'
                                : ''}{' '}
                            &nbsp;
                        </p>
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
                            <input
                                checked={this.state.read_check}
                                onChange={this.checkBoxHandler}
                                type="checkbox"
                                id="haveread-chkbox"
                            />{' '}
                            I have read and agree to the{' '}
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
