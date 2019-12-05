import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adreceptionActions } from '../../store/actions/adreception.action';
import { Spinner } from 'react-bootstrap';
import './Redirect.css';

class Redirect extends Component {
    componentDidMount() {
        this.props.getRedirectAddr(this.props.match.params.str);
    }
    render() {
        return (
            <div className="Redirect">
                <Spinner
                    animation="border"
                    id="redirecting_spinner"
                    variant="danger"
                />
                <h2 id="redirecting_text">Redirecting...</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        link: state.adreception.ad_link
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRedirectAddr: data => dispatch(adreceptionActions.postRedirect(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);
