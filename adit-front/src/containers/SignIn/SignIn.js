import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import './SignIn.css'
import avatar from '../../assets/avatar.png'

class SignIn extends Component {
    state = {email: '', password: '', name:'', logged_in: false, storedUsers:{email:'csh3695@naver.com', password:'ihateswpp',name:'Kent', logged_in:true}}
    SignInHandler = () => {
        if (this.state.storedUsers.email === this.state.email && this.state.storedUsers.password === this.state.password){
            this.setState({...this.state, email:this.state.storedUsers.email, password:'', name:this.state.storedUsers.name, logged_in:true, })
            window.location.assign('/home')
            return
        }
        alert('Email or password is wrong')
        return
    }
    SignUpHandler = () => {
        window.location.assign('/signup')
    }
    render(){
        return(
            <div className='SignIn'>
                <div className='SignInForm'>
                    <div className='avatar'>
                        <img src={avatar} className="Avatar"/>
                    </div>
                    <h2 className="text-center">Sign In!</h2>   
                    <div className="form-group">
                        <input className="form-control" id='email-input' type='text' value={this.state.email} required="required" onChange={(event)=>this.setState({email:event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" id='pw-input' type='password' value={this.state.password} required="required" onChange={(event)=>this.setState({password:event.target.value})}/>
                    </div>        
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" button id='login-button' onClick={()=>this.SignInHandler()}>Sign in</button>
                    </div>
                    <div className="clearfix">
                        <label clasName="Remember"><input type="checkbox"/> Remember me</label>
                        <a href="#" className="ForgotPW">Forgot Password?</a>
                    </div>
                </div>
                <p className="text-center small">Don't have an account? <a href="#" onClick = {() => this.SignUpHandler()}>Sign up here!</a></p>
            </div>
        )
    }
}

export default SignIn