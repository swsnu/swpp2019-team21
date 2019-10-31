import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import './SignUp.css'
import avatar from '../../assets/avatar.png'
import * as actionCreators from '../../store/actions/user.action'

class SignUp extends Component {
    state = {email: '', password: '', password_check:'', fname:'', lname:'',}
    SignupHandler = () => {
        alert('Welcome!')
        this.props.history.push('/signin')
        const user = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.fname,
            lastname: this.state.lname,
            nickname: this.state.fname
        }
        this.props.onsignUp(user)
        return
    }
    render(){
        return(
            <div className='SignUp'>
                <div className='SignUpForm'>
                    <div className='avatar'>
                        <img src={avatar} className="Avatar"/>
                    </div>
                    <h2 className="text-center">Join Us:)</h2>   
                    <div className="form-group">
                        <p className="input-tag" align='left'>Email Address</p>
                        <input className="form-control" id='email-input' type='text' value={this.state.email} required="required" onChange={(event)=>this.setState({email:event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <p className="input-tag" align='left'>Password</p>
                        <input className="form-control" id='pw-input' type='password' value={this.state.password} required="required" onChange={(event)=>this.setState({password:event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <p className="input-tag" align='left'>Password Check</p>
                        <input className="form-control" id='pw-check' type='password' value={this.state.password_check} required="required" onChange={(event)=>this.setState({password_check:event.target.value})}/>
                    </div>
                    <table>
                        <td>
                            <div className="form-group">
                                <p className="input-tag" align='left'>First Name</p>
                                <input className="form-control" id='fname' type='text' value={this.state.fname} required="required" onChange={(event)=>this.setState({fname:event.target.value})}/>
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <p className="input-tag" align='left'>Last Name</p>
                                <input className="form-control" id='lname' type='text' value={this.state.lname} required="required" onChange={(event)=>this.setState({lname:event.target.value})}/>
                            </div>
                        </td>   
                    </table>        
                    <div className="checkterm">
                        <label clasName="Term"><input type="checkbox" id='haveread-chkbox'/> I have read and agree to the <a href='#'>terms of service</a></label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" button id='signup-button' onClick={()=>this.SignupHandler()}>Sign up!</button>
                    </div>
                </div>  
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return{
        selected : state.td.selectedArticle,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        ...this,
        onsignUp : (user) => dispatch(actionCreators.signUp(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);