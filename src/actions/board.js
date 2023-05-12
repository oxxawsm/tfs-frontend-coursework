
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
export const addCard = (sectionId, text) => {
    return {
        type: ADD_CARD,
        payload: {text, sectionId} 
    }
}

// удаление карточки
export const deleteCard = (cardId, sectionId) => {
    return {
        type: DELETE_CARD,
        payload: {cardId, sectionId}
    }
}

// наличие доски
export const requestBoard = () => {
    return {
        type: GET_BOARD_REQUEST,
    }
}

export const getBoard = () => {
    return {
        type: GET_BOARD_SUCCESS,
    }
}

export const requestUpdateBoard = () => {
    return {
        type: UPDATE_BOARD_REQUEST
    }
}

export const getUpdateBoard = () => {
    return {
        type: UPDATE_BOARD_SUCCESS
    }
}

// добавление раздела
export const addSection = (title) => {
    return{
        type: ADD_SECTION,
        payload: title,
    }
}

// удаление раздела
export const deleteSection = (sectionId) => {
    return {
        type: DELETE_SECTION,
        payload: {sectionId}
    }
}

