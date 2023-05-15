import { Firebase } from "../firebase/firebaseConfig";



export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAIL
    };
};

const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    };
};

const receiveRegister = user => {
    return {
        type: REGISTER_SUCCESS,
        user
    }
}

const registerError = (message) => {
    return {
        type: REGISTER_FAIL,
        message
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAIL
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};


export const loginUser = (email, password, history) => async dispatch => {
    dispatch(requestLogin());
    Firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(receiveLogin(user));
            history.push("/");
        })
        .catch(error => {
            dispatch(loginError());
        });
};

export const registerUser = (email, password, displayName, callback) => async dispatch => {
    dispatch(requestRegister());
    Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.updateProfile({
                displayName: displayName,
            }).then(() => {
                const email = userCredential.user.email.replace(".", ","); 
                const userId = userCredential.user.uid;
                const name = userCredential.user.displayName;
                Firebase.database().ref('/users/${userId}').set({
                    email: email,
                    name: name
                });
                Firebase.database().ref('/emailToUid/').child(email).set({
                    userId
                })
                dispatch(receiveRegister());
                callback();
            });
        })
        .catch(error => {
            dispatch(registerError(error.message));
        });
};

export const logoutUser = () => async dispatch => {
    dispatch(requestLogout());
    Firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
};

export const verifyAuth = () => async dispatch => {
    dispatch(verifyRequest());
    Firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user));
            dispatch(verifySuccess());
        } else {
            dispatch(loginError());
        }
    });
};