import * as actionTypes from '../../../actions/admin/actionTypes'

const initialState = {
    users : [],
    collapse : false,
    toBeEditedUserId: -1
};

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users : action.result,
                collapse : false,
                toBeEditedUserId: -1
            }

        case actionTypes.SET_EDIT_USER_ID:
            return {
                ...state,
                toBeEditedUserId : action.userId
            }
        default:
            return state;
    }
}