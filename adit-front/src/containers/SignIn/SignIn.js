import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import './SignIn.css'
import avatar from '../../assets/avatar.png'

class SignIn extends Component {
    props = {storedUsers:{email:'csh3695@naver.com', password:'ihateswpp',name:'Kent', logged_in:true},}
    state = {email: '', password: '', name:'', logged_in: false}
    SigninHandler = () => {
        if (this.props.storedUsers.email === this.state.email && this.props.storedUsers.password === this.state.password){
            this.setstate({...this.state, email:this.props.storedUsers.email, password:'pw', name:this.props.storedUsers.name, logged_in:true, })
            window.location.assign('/articles')
            return
        }
        alert('Email or password is wrong')
        return
    }
    render(){
        return(
            <div className='SignIn'>
                <div className='SignInForm'>
                    <div className='avatar'>
                        <img src={avatar} className="Avatar"/>
                    </div>
                    <h2 className="text-center">Member Login</h2>   
                    <div className="form-group">
                        <input className="form-control" id='email-input' type='text' value={this.state.email} required="required" onChange={(event)=>this.setState({email:event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" id='pw-input' type='password' value={this.state.password} required="required" onChange={(event)=>this.setState({password:event.target.value})}/>
                    </div>        
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" button id='login-button' onClick={()=>this.SigninHandler()}>Sign in</button>
                    </div>
                    <div className="clearfix">
                        <label clasName="Remember"><input type="checkbox"/> Remember me</label>
                        <a href="#" className="ForgotPW">Forgot Password?</a>
                    </div>
                </div>
                <p className="text-center small">Don't have an account? <a href="#">Sign up here!</a></p>
            </div>
        )
    }
}

export default SignIn