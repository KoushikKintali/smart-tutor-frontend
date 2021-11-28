import React, { Component } from 'react'
import { Row, Container} from 'reactstrap'
import { Link } from 'react-router-dom'

class StudentAppHome extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Row className="fai_dataprocess_wrap">
                    <div className="fai__wrapper" >
                        <h1 className="main-head">Real Estate<span className="clr-b ml-2">Home</span></h1>
                        <div className="text-center">
                            <img width="607" height="160" src={require('Images/info.jpeg')} className="img-responsive" /> 
                            <h3 className="t-72 f-w600 mt-3">Real Estate Listings</h3>
                            <h5 className="t-24 clr-b">Complete database of real estate listings</h5> 
                            <div className="text-center mtb-40">
                                {/* <button type="button" className="fai__buttons faibtn__orange t-20" onClick={this.login}>Get Started</button> */}
                                <Link to="/comps_on_market" className="fai__buttons faibtn__orange t-20">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default StudentAppHome;