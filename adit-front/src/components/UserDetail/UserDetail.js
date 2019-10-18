import React, { Component, Profiler } from 'react'
import { Modal, Button, Dropdown, DropdownButton, Navbar, Image, OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import profile from './../../assets/iu_profile.png'
import { connect } from 'net';
import './UserDetail.css'
import avatar from '../../assets/avatar.png'

class UserDetail extends Component {
    state = {fname:'John', lname:'Doe', show:false}
    componentDidMount(){
        this.setState({fname:this.props.fname, lname:this.props.lname, nickname: this.props.nickname})
    }
    changePWHandler = () => this.setState({show: true})
    changePWFinishHandler = () => {
        this.setState({show: false})
        alert("Done!")
        window.location.assign('/signin')
    }
    render(){
        return(
            <div className='UserDetail'>
                <Modal show = {this.state.show} onHide={this.changePWFinishHandler}>
                    <Modal.Header closeButton>
                       <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group" align='left'>
                            <p className='label-tag' align='left'>Current Password</p>
                            <input type='password' className="form-fixed" id='password'/>
                        </div>
                        <div className="form-group" align='left'>
                            <p className='label-tag' align='left'>New Password</p>
                            <input type='password' className="form-fixed" id='new-password'/>
                        </div>
                        <div className="form-group" align='left'>
                            <p className='label-tag' align='left'>New Password Again</p>
                            <input type='password' className="form-fixed" id='new-password-check'/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.changePWFinishHandler}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <h2 className='UserInfoTitle'>User Info</h2>
                <div className='avatar'>
                    <img src={this.props.profileimg} className="Avatar"/>
                </div>
                <div className="form-group" align='left'>
                    <p className='label-tag' align='left'>Email</p>
                    <text className="form-fixed" id='email'>{this.props.email}</text>
                </div>
                <div className="form-group">
                    <p className='label-tag' align='left'>Nickname</p>
                    <input className="form-control" id='fname' type='text' value={this.state.nickname} onChange={(event)=>this.setState({nickname:event.target.value})}/>
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
                        <ListGroup.Item action variant='light' onClick = {this.changePWHandler}>
                            <h6>Change Password</h6>
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