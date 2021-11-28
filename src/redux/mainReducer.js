import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax'

const retrieveViaAjax = (url, token) => {
    return (
        ajax({
            url: url,
            method: 'GET',
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer '+token
            }
        })
    )
};

const updateViaAjax = (url, data, token) => {

    return (
        ajax({
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },

            body: data
        })
    )
}

const updateViaAjaxWithoutToken = (url, data) => {
    return (
        ajax({
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: data
        })
    )
}


import { authentication } from './reducers/authentication'
import { signUp,login, logout, forgotPassword, fetchAlerts } from './epics/authentication'
import { admin } from './reducers/admin'
import { fetchUsers, addUser, editUserDetails, deleteUser} from './epics/admin'


export const mainReducer = combineReducers({
    authentication: authentication,
    admin: admin,
})

export const epics = (...args) => combineEpics(
    signUp,login, logout, forgotPassword, fetchAlerts,
    fetchUsers, addUser, editUserDetails, deleteUser)
    (...args, { 
        ajax, 
        retrieveViaAjax, 
        updateViaAjax, 
        updateViaAjaxWithoutToken 
    })
