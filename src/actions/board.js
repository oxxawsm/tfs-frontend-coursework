import { Firebase } from "../firebase/firebaseConfig";

export const SET_BOARD_ID = "SET_BOARD_ID";
export const GET_BOARD_REQUEST = "GET_BOARD_REQUEST";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAILED = "GET_BOARD_FAILED";
export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILED = "UPDATE_BOARD_FAILED";


export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const ADD_SECTION = "ADD_SECTION";
export const DELETE_SECTION = "DELETE_SECTION";
export const GET_SECTIONS = "GET_SECTIONS";

export const DRAG_HAPPENED = "DRAG_HAPPENED";

// добавление карточки
export const addSection = (title) => {
    return {
        type: ADD_SECTION,
        payload: title,
    };
};

export const deleteSection = (sectionId) => {
    return {
        type: DELETE_SECTION,
        payload: { sectionId }
    };
};

export const addCard = (sectionId, text) => {
    return {
        type: ADD_CARD,
        payload: { text, sectionId },
    };
};

export const deleteCard = (cardId, sectionId) => {
    return {
        type: DELETE_CARD,
        payload: { cardId, sectionId }
    };
};

export const requestBoard = () => {
    return {
        type: GET_BOARD_REQUEST,
    };
};

export const getBoard = (board) => {
    return {
        type: GET_BOARD_SUCCESS,
        board
    };
};

export const getBoardError = (uid) => {
    return {
        type: GET_BOARD_FAILED,
        uid
    };
};

export const requestUpdateBoard = () => {
    return {
        type: UPDATE_BOARD_REQUEST,
    };
};

export const getUpdateBoard = () => {
    return {
        type: UPDATE_BOARD_SUCCESS,
    };
};

export const updateBoardError = () => {
    return {
        type: UPDATE_BOARD_FAILED,
    };
};


export const updateBoard = (board) => dispatch => {
    const user = Firebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        dispatch(requestUpdateBoard());
        Firebase.database()
            .ref('/board/')
            .child(board.boardId)
            .set(board).then(() => {
                dispatch(getUpdateBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};

export const loadBoard = (uid) => dispatch => {
    dispatch(requestBoard());

    Firebase.database().ref('/board/' + uid).once('value').then(function (snapshot) {
        const board = {
            boardId: snapshot.val().boardId,
            sections: snapshot.val().sections,
        }
        dispatch(getBoard(board));
    }).catch((err) => {
        dispatch(getBoardError(uid));
    });
};

export const listenBoard = (uid) => dispatch => {
    Firebase.database().ref('/board/' + uid).on('value', function (snapshot) {
        if (snapshot.val() != null) {
            const board = {
                boardId: snapshot.val().boardId,
                sections: snapshot.val().sections,
            }
            dispatch(getBoard(board));
        }
    });
};
