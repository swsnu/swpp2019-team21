import React, { Component, Profiler } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/adreception.action';
import { Spinner } from 'react-bootstrap';
import './Redirect.css';

class Redirect extends Component {
    componentDidMount() {
        this.props.getRedirectAddr(this.props.match.params.str)
    }
    render() {
        return (
            <div className='Redirect'>
                <Spinner animation="grow" id="redirecting_spinner"/>
                <h2 id="redirecting_text">Redirecting...</h2>
            </div>   
        );
    }
}

const mapStateToProps = state => {
    return {
        link: state.adreception.ad_link
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRedirectAddr: (data) => dispatch(actionCreators.postRedirect(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Redirect);