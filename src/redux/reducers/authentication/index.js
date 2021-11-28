import * as actionTypes from '../../../actions/authentication/actionTypes'

const initialState = {
    alerts:[],
    isLoggedIn: true,
    token: "",
    loggedInUserName : localStorage.getItem('loggedInUserName'),
    showSpinner:false,
    loggedInUserRole : localStorage.getItem('loggedInUserRole')
}

const getDayDate = (days) => {
    let dd = new Date();
    dd.setDate(dd.getDate() + days);
    return dd.toGMTString();
}

const setCookie = (name, value, days = 1) => document.cookie = `${name}=${value}; expires=${getDayDate(days)}`;

const deleteCookie = (name) => document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SUCCESS:
            return {
                ...state
            }

        case (actionTypes.ERROR):
            return {
                ...state
            }
        case actionTypes.SHOW_SPINNER :
            return {
                ...state,
                showSpinner : true
            }
        case actionTypes.HIDE_SPINNER :
            return {
                ...state,
                showSpinner : false
            }
        case (actionTypes.SIGNUP_SUCCESS):
            return {
                ...state
            }

        case (actionTypes.LOGIN_SUCCESS):
            setCookie('token', action.response.data.token);
            localStorage.setItem('loggedInUserName', action.response.data.user_name)
            localStorage.setItem('loggedInUserRole', action.response.data.user_role)
            return {
                ...state,
                token: action.response.data.token,
                loggedInUserName: action.response.data.user_name,
                loggedInUserRole: action.response.data.user_role,
                isLoggedIn: true,
            }

        case (actionTypes.LOGOUT_SUCCESS):
            deleteCookie('token')
            localStorage.setItem('loggedInUserName', "")
            localStorage.setItem('loggedInUserRole', "")
            return {
                ...state,
                token: "",
                loggedInUserName:"",
                loggedInUserRole:"",
                isLoggedIn: false,
            }

        case (actionTypes.FORGOT_PASSWORD_SUCCESS):
            return {
                ...state
            }
        case (actionTypes.FETCH_ALERTS_SUCCESS):
            return{
                ...state,
                alerts : action.response
                
            }
        default:
            return {
                ...state
            }
    }
}
