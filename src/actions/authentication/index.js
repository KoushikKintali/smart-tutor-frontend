import * as actionTypes from './actionTypes'

export function signUp(signUpDetails) {
    this.loadSpinner()
    return {
        type: actionTypes.SIGNUP,
        signUpDetails
    }
}

export function login(loginDetails) {
    this.loadSpinner()
    return {
        type: actionTypes.LOGIN,
        loginDetails
    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}

export function forgotPassword(stateValues) {
    return {
        type : actionTypes.FORGOT_PASSWORD,
        stateValues
    }
}

// export function fetchAlerts(){
//     this.loadSpinner()
//     return{
//         type:actionTypes.FETCH_ALERTS
//     }
// }
export function loadSpinner(){
    return{
        type : actionTypes.SHOW_SPINNER
    }
}

export function fetchAlerts(filters, limit) {
    this.loadSpinner()
    return {
        type: actionTypes.FETCH_ALERTS,
        filters,
        limit
}
}
