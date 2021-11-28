import * as actionTypes from './actionTypes'

export function fetshUsers() {
    this.loadSpinner()
    return {
        type: actionTypes.FETCH_USERS
    }
}

export function addUser(userDetails) {
    this.loadSpinner()
    return {
        type : actionTypes.ADD_USER,
        userDetails
    }
}

export function setEditUserId(userId) {
    return {
        type : actionTypes.SET_EDIT_USER_ID,
        userId
    }
}

export function editUserDetails(userDetails) {
    this.loadSpinner()
    return {
        type : actionTypes.EDIT_USER_DETAILS,
        userDetails
    }
}

export function deleteUser(userDetails) {
    this.loadSpinner()
    return {
        type : actionTypes.DELETE_USER,
        userDetails
    }
}

export function loadSpinner(){
    return{
        type : actionTypes.SHOW_SPINNER
    }
}