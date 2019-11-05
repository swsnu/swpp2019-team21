import React, { Component, Profiler } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/adreception.action';

class Redirect extends Component {
    componentDidMount() {
        this.props.getRedirectAddr(this.props.match.params.str)
        console.log(this.props.link)
        if(this.props.link == null) window.close()
        else this.props.history.push(this.props.link)
    }
    render() {
        return (
            <div className='Redirect'>
                <h1>{this.props.match.params.str}</h1>
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