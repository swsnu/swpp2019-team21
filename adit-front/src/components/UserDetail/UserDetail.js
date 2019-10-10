import React, { Component, Profiler } from 'react'
import { Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import './UserDetail.css'
import avatar from '../../assets/avatar.png'

class UserDetail extends Component {
    state = {fname:'John', lname:'Doe'}
    componentDidMount(){
        this.setState({fname:this.props.fname, lname:this.props.lname})
    }
    SignupHandler = () => {
        alert('Welcome!')
        window.location.assign('/signin')
        return 
    }
    render(){
        return(
            <div className='UserDetail'>
                <h2 className='UserInfoTitle'>User Info</h2>
                <div className='avatar'>
                    <img src={avatar} className="Avatar"/>
                </div>
                <div className="form-group" align='left'>
                    <p className='label-tag' align='left'>Email</p>
                    <text className="form-fixed" id='email'>{this.props.email}</text>
                </div>
                <table>
                    <td>
                        <div className="form-group">
                            <p className='label-tag' align='left'>First Name</p>
                            <input className="form-control" id='fname' type='text' value={this.state.fname} onChange={(event)=>this.setState({fname:event.target.value})}/>
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <p className='label-tag' align='left'>Last Name</p>
                            <input className="form-control" id='lname' type='text' value={this.state.lname} onChange={(event)=>this.setState({lname:event.target.value})}/>
                        </div>
                    </td>
                </table>
                <div className="form-group" align='left'>
                    <p className='label-tag' align='left'>Points Available</p>
                    <text className="form-fixed" id='point'>{this.props.point}</text>
                </div>
                <div className="form-group" align='left'>
                    <ListGroup id='UserFunctList'>
                        <ListGroup.Item action variant='light' onClick = {() => alert('Charge Point?')}>
                            <h6>Charge Point</h6> 
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' onClick = {() => alert('GOOOOOOOOOOOD!')}>
                            <h6>New AD Request</h6>
                        </ListGroup.Item>
                        <ListGroup.Item action variant='light' onClick = {() => alert('Saved!')}>
                            <h6>Save Changes</h6> 
                        </ListGroup.Item>
                    </ListGroup>
                    <p className="form-select" align='right'><a href="#" onClick = {() => alert('Noooo.....')}>Withrawal</a></p>
                </div>
            </div>
        )
    }
}

export default UserDetail