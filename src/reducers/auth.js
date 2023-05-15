import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
} from '../actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default (
    state = {
        loginError: false,
        logoutError: false,
        registerError: false,
        isAuthenticated: false,
        error: false,
        errorMessage: '',
        user: {}
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginError: false,
                errorMessage: '',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                errorMessage: '',
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loginError: true
            };
        case REGISTER_REQUEST:
            return {
                ...state,
                registerError: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        case REGISTER_FAIL:
            return {
                ...state,
                errorMessage: action.message,
                isAuthenticated: false,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                logoutError: true
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                verifyingError: false
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            };
        default:
            return state;
    }
};