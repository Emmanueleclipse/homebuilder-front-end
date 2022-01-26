import {userTypes} from '../types/user.types'

const initialState = {

    user: {},
    error: null,
    token: null,
    loading: false,
    authRedirectPath: '/'
}


const authReducer = (state = initialState, action) => {
    let updatedForm = {};
    switch (action.type) {

        case userTypes.AUTH_START:


            return {
                ...state,
                loading: true
            }


        case userTypes.AUTH_SUCCESS:

            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
                loading: false,

            }
        case userTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false

            }
        case userTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                user: {}
            }
        case userTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path

            }
        case userTypes.LOAD_AUTH_USER:
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }

}

export default authReducer