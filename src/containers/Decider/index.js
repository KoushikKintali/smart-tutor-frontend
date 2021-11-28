import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router-dom'
import UnAuthenticatedRouteContainer from '../UnAuthenticatedRoutes'
import history from './History'

class Decider extends Component {
    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                {
                    <UnAuthenticatedRouteContainer />
                }
                </Router>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    }
}


export default connect(mapStateToProps)(Decider);


