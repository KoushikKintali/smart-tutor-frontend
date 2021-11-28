import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import StudentAppHome from '../Routes/StudentAppHome'
import SmartTutorStudent from '../Routes/SmartTutorStudent'
import smartTutorteacher from '../Routes/smartTutorTeacher'


class UnAuthenticatedRouteContainer extends Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/student-app-home" exact component={StudentAppHome} />
                    <Route path="/smart-tutor-student" exact component={SmartTutorStudent} />
                    {/* <Route path="/teacher-app-home" exact component={TeacherAppHome} /> */}
                    <Route path="/smart-tutor-teacher" exact component={smartTutorteacher} />
                </Switch>
            </React.Fragment>

        );
    }
}

export default UnAuthenticatedRouteContainer;

