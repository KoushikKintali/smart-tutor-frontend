import React, { Component } from 'react'
import {Layout, Button} from 'antd'
import history from '../../../containers/Decider/History'
import './_index.less'

class StudentAppHome extends Component {
    render() {
        return (
            <Layout>
                <img width="100%" src={require('Images/image.png')}/>
                {/* <Button className="nav-button" onClick={() => {history.push('/smart-tutor-student')}}>Smart Tutor</Button>  */}
            </Layout>
        );
    }
}

export default StudentAppHome;