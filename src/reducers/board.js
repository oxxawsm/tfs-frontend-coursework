import {
    GET_SECTIONS,
    DRAG_HAPPENED,
    ADD_CARD,
    ADD_SECTION,
    GET_BOARD_SUCCESS,
    GET_BOARD_FAILED,
    CREATE_BOARD_SUCCESS,
    DELETE_CARD,
    DELETE_SECTION,
} from "../actions/";

function generateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({length: 24}, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }
  

const initialState = {
    boardId: generateId(),
    title: '',
    lists: [],
};

const board = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOARD_SUCCESS:
            return { ...state, boardId: action.uid, sections: [] };
        case GET_BOARD_SUCCESS:
            return action.board;
        case GET_BOARD_FAILED:
            return { ...state, sections: [], boardId: action.uid };
        case GET_SECTIONS:
            return state;
        case ADD_SECTION:
            const newSection = {
                title: action.payload,
                cards: [],
                id: generateId(),
            }
            if (state.sections) {
                return { ...state, sections: [...state.sections, newSection] };
            } else {
                return { ...state, sections: [newSection] }
            }


        case DELETE_SECTION:
            const sectionId = action.payload.sectionId;
            const newSections = [...state.sections];
            state.sections.forEach(function (section, index) {
                if (section.id === sectionId) {
                    newSections.splice(index, 1);
                    return;
                }
            });
            return { ...state, sections: newSections };

        case ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: generateId(),
            }
            const newSections = state.sections.map(section => {
                if (section.id === action.payload.sectionId) {
                    if (section.cards) {
                        return { ...section, cards: [...section.cards, newCard] };
                    } else {
                        return { ...section, cards: [newCard] };
                    }
                } else {
                    return section;
                }
            });

            return { ...state, sections: newSections };
        }

        case DELETE_CARD: {
            const cardId = action.payload.cardId;
            const sectionId = action.payload.sectionId;
            const newSections = state.sections.map(section => {
                if (section.id === sectionId) {
                    const cardsList = [...section.cards];
                    section.cards.forEach(function (card, index) {
                        if (card.id === cardId) {
                            cardsList.splice(index, 1);
                            return;
                        }
                    });
                    return { ...section, cards: cardsList };
                } else {
                    return section;
                }
            });
            return { ...state, sections: newSections };
        }



        default:
            return state;
    }
};

export default board
