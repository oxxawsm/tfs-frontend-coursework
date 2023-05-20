import { Firebase } from "../firebase/firebaseConfig";

export const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAILED = "CREATE_BOARD_FAILED";

export const GET_BOARDS_REQUEST = "GET_BOARDS_REQUEST";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_BOARDS_FAILED = "GET_BOARDS_FAILED";

export const GET_BOARD_NAME_SUCCESS = "GET_BOARD_NAME_SUCCESS";

const requestBoards = () => {
    return {
        type: GET_BOARDS_REQUEST
    };
};
const receiveBoards = (boards) => {
    return {
        type: GET_BOARDS_SUCCESS,
        boards
    };
};

// Create Board
const requestCreateBoard = () => {
    return {
        type: CREATE_BOARD_REQUEST
    };
};
const receiveCreateBoard = (uid) => {
    return {
        type: CREATE_BOARD_SUCCESS,
        uid
    };
};
const createBoardError = () => {
    return {
        type: CREATE_BOARD_FAILED
    };
};

const getBoardName = (name, boardId) => {
    return {
        type: GET_BOARD_NAME_SUCCESS,
        name,
        boardId,
    };
};

export const createBoard = (title) => dispatch => {
    dispatch(requestCreateBoard());
    const user = Firebase.auth().currentUser;
    if (!user) {
        dispatch(createBoardError());
    } else {
        const uid = user.uid;
        const key = Firebase.database().ref('boards/')
            .push({
                title: title
            }, (err) => {
                if (err) {
                    dispatch(createBoardError());
                }
            }).key;
        Firebase.database().ref('boards/' + key + '/members').push({
            uid: uid
        });
        Firebase.database().ref('/userBoards/' + uid).child(key).set(true);
        Firebase.database().ref('/board/' + key).set({
            boardId: key,
            sections: { 0: { id: '0', title: 'TODO' } },
        });
        dispatch(receiveCreateBoard(key));
    }
    
};

export const deleteBoard = (boardId) => dispatch => {
    // список всех id из '/boards/boardId/members/' 
    // пройтись по списку и удалить все вхождения boardId из userId
    Firebase.database().ref('/boards/' + boardId + '/members/').once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                Firebase.database().ref('/userBoards/' + data.val().uid).child(boardId).remove();
            })
        }
    }).then(() => {
        // убрать из '/boards/'
        Firebase.database().ref('/boards/' + boardId).remove();
        // убрать из '/board/'
        Firebase.database().ref('/board/' + boardId).remove().then(() => {
            dispatch(loadUserBoards());
        });
    });
}

export const loadUserBoards = () => dispatch => {
    dispatch(requestBoards());
    const user = Firebase.auth().currentUser;
    // список boardId из /userBoards/
    // список boards titles из /boards/ с помощью boardId
    let boards = [];
    Firebase.database().ref('/userBoards/' + user?.uid).once('value', function (snapshot) {
        snapshot.forEach(function (data) {
            Firebase.database().ref('/boards/' + data.key).once('value', function (snap) {
                if (snap.exists()) {
                    boards.push({
                        boardId: data.key,
                        title: snap.val().title,
                    });
                }
            }).then(() => {
                dispatch(receiveBoards(boards));
            })
        });
    });
};


export const updateBoardName = (boardName, boardId) => dispatch => {
    Firebase.database().ref('/boards/' + boardId).update({ title: boardName });
};

export const listenBoardName = (boardId) => dispatch => {
    Firebase.database().ref('/boards/' + boardId).on('value', function (snapshot) {
        if (snapshot.val() != null)
            dispatch(getBoardName(snapshot.val().title, boardId));
    });
};
