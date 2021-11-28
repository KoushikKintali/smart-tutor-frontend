import { ofType } from 'redux-observable';
import { mergeMap, switchMap, map, filter, catchError,finalize } from 'rxjs/operators'
import { merge, of } from 'rxjs'
import * as actionTypes from '../../../actions/authentication/actionTypes'
import history from '../../../containers/Decider/History'
import {deployedUrl} from '../../../config/deploymentConfig/deploymentConfig'

// Local
const signupUrl =`${deployedUrl}/add_customer`
const loginUrl = `${deployedUrl}/login`
const logoutUrl = `${deployedUrl}/logout`
const forgotPasswordUrl = `${deployedUrl}/forgot_password`
const fetchAlertsUrl = `${deployedUrl}/get_alerts`



const generateSqlQuery = (filters, limit) =>{
    var sqlQuery={}
    for (var column in filters){
        if (Object.keys(sqlQuery).length==0){
            sqlQuery["query"]=filters[column]["query"] 
        }else{
            sqlQuery["query"]=sqlQuery["query"]+" and "+filters[column]["query"]
        }
    }
    if(!isNaN(parseInt(limit))){
        sqlQuery["limit"]=limit
    }

    return sqlQuery
}

const generateForgotPasswordData = (stateValues) => {
    return {
        'email' : stateValues.email
    }
}

export const signUp = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.SIGNUP),
    switchMap(action => updateViaAjax(signupUrl, action.signUpDetails).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap(result => {
            return merge(
                of({
                    type: actionTypes.SIGNUP_SUCCESS,
                    response : result.response
                }),
                of({
                    type: actionTypes.HIDE_SPINNER,
                })
            )
        }),
        catchError(error => {
            return of({
                type: actionTypes.ERROR,
                payload: error.xhr.response,
                error: true
            })
        }),
        finalize(() => {
            history.push('/')
        })
    ))
);

export const login = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.LOGIN),
    switchMap(action => updateViaAjax(loginUrl, action.loginDetails).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap(result => {
            return merge(
                of({
                    type: actionTypes.LOGIN_SUCCESS,
                    response : result.response
                }),
                of({
                    type: actionTypes.HIDE_SPINNER,
                })
            )
        }),
        catchError(error => {
            if(error.xhr.response.shouldLogout) {
                return merge(
                    of({
                        type: actionTypes.LOGOUT_SUCCESS
                    }),
                    of({
                        type: actionTypes.HIDE_SPINNER,
                    }),
                    of({
                        type: actionTypes.ERROR,
                        payload: error.xhr.response,
                        error: true
                    })
                )
            }else{
                return merge(
                    of({
                        type: actionTypes.HIDE_SPINNER,
                    }),
                    of({
                        type: actionTypes.ERROR,
                        payload: error.xhr.response,
                        error: true
                    })
                )
            }
        }
        )
    ))
);

export const logout = (action$, state$, { retrieveViaAjax }) => action$.pipe(
    ofType(actionTypes.LOGOUT),
    switchMap(action => retrieveViaAjax(logoutUrl, state$.value.authentication.token).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap(result => {
            return merge(
                of({
                    type: actionTypes.LOGOUT_SUCCESS,
                    response: result.response
                })
            )
        }),
        catchError(error => {
            if(error.xhr.response.shouldLogout) {
                return merge(
                    of({
                        type: actionTypes.LOGOUT_SUCCESS
                    }),
                    of({
                        type: actionTypes.ERROR,
                        payload: error.xhr.response,
                        error: true
                    })
                )
            }else{
                return of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            }
        }),
        finalize(() => {
            history.push('/')
        })
    ))
);

export const forgotPassword = (action$, state$, { updateViaAjaxWithoutToken }) => action$.pipe(
    ofType(actionTypes.FORGOT_PASSWORD),
    switchMap(action => updateViaAjaxWithoutToken(forgotPasswordUrl, generateForgotPasswordData(action.stateValues)).pipe(
        switchMap(response => of({
            ...response,
        })),
        mergeMap(result => {
            return merge(
                of({
                    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
                    response: result.response
                })
            )
        }),
        catchError(error => {
            if(error.xhr.response.shouldLogout) {
                return merge(
                    of({
                        type: actionTypes.LOGOUT_SUCCESS
                    }),
                    of({
                        type: actionTypes.ERROR,
                        payload: error.xhr.response,
                        error: true
                    })
                )
            }else{
                return of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            }
        }
        )
    ))
);

export const fetchAlerts = (action$, state$, { updateViaAjax }) => action$.pipe(
    ofType(actionTypes.FETCH_ALERTS),
    switchMap(action => updateViaAjax(fetchAlertsUrl,generateSqlQuery(action.filters, action.limit), state$.value.authentication.token)),
    mergeMap((result) => {
        return merge(
            of({
                type: actionTypes.HIDE_SPINNER,
                response: result.response
            }),
            of({
                type: actionTypes.FETCH_ALERTS_SUCCESS,
                response: result.response
            })
        )
    }),

    catchError(error => {
        if(error.xhr.response.shouldLogout) {
            return merge(
                of({
                    type: actionTypes.LOGOUT_SUCCESS
                }),
                of({
                    type: actionTypes.ERROR,
                    payload: error.xhr.response,
                    error: true
                })
            )
        }else{
            return of({
                type: actionTypes.ERROR,
                payload: error.xhr.response,
                error: true
            })
        }
    }
    )
)