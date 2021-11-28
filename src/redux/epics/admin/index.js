import { ofType } from 'redux-observable';
import { mergeMap, switchMap, map, filter, catchError } from 'rxjs/operators';
import { merge, of } from 'rxjs'
import * as actionTypes from '../../../actions/admin/actionTypes'
import {deployedUrl} from '../../../config/deploymentConfig/deploymentConfig'
// local
const fetchUsersUrl = `${deployedUrl}/get_users`
const addUserUrl = `${deployedUrl}/add_user`
const editUserUrl = `${deployedUrl}/edit_user`
const deleteUserUrl = `${deployedUrl}/delete_user`

const generateEditUserData = (userDetails) => {
    return {
        "username": userDetails.username,
        "email": userDetails.email,
        "phoneNumber": userDetails.phoneNumber
    }
}

const generateDeleteUserData = (userDetails) => {
    return {
        "email": userDetails.email
    }
}

export const fetchUsers = (action$, state$, { retrieveViaAjax }) => action$.pipe(
    ofType(actionTypes.FETCH_USERS),
    switchMap(action => retrieveViaAjax(fetchUsersUrl, state$.value.authentication.token)),
    mergeMap((result) => {
        return merge(
            of({
                type: actionTypes.FETCH_USERS_SUCCESS,
                result: result.response
            }),
            of({
                type: actionTypes.HIDE_SPINNER,
                result: result.response
            })
        )
    })
)

export const addUser = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.ADD_USER),
    switchMap(action => updateViaAjax(addUserUrl, action.userDetails, state$.value.authentication.token).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap((result) => {
            return merge(
                of({
                    type: actionTypes.SUCCESS,
                    payload:result.response
                }),
                of({
                    type: actionTypes.FETCH_USERS
                }),
                of({
                    type: actionTypes.HIDE_SPINNER
                })
            )
        }),
        catchError(error =>{
            return merge(
                of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            )
        })
        )
    )
)

export const editUserDetails = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.EDIT_USER_DETAILS),
    switchMap(action => updateViaAjax(editUserUrl, generateEditUserData(action.userDetails),state$.value.authentication.token).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap((result) => {
            return merge(
                of({
                    type: actionTypes.SUCCESS,
                    payload:result.response
                }),
                of({
                    type: actionTypes.FETCH_USERS
                }),
                of({
                    type: actionTypes.HIDE_SPINNER
                })
            )
        }),
        catchError(error =>{
            return merge(
                of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            )
        })
        )
    )
)

export const deleteUser = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.DELETE_USER),
    switchMap(action => updateViaAjax(deleteUserUrl, generateDeleteUserData(action.userDetails),state$.value.authentication.token).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap((result) => {
            return merge(
                of({
                    type: actionTypes.SUCCESS,
                    payload:result.response
                }),
                of({
                    type: actionTypes.FETCH_USERS
                }),
                of({
                    type: actionTypes.HIDE_SPINNER
                })
            )
        }),
        catchError(error =>{
            return merge(
                of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            )
        })
        )
    )
)