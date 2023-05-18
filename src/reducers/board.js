import {
    GET_SECTIONS,
    DRAG_HAPPENED,
    ADD_CARD,
    ADD_SECTION,
    GET_BOARD_SUCCESS,
    GET_BOARD_FAILED,
    DELETE_CARD,
    DELETE_SECTION,
    CREATE_BOARD_SUCCESS
} from '../actions';

import { v4 as uuidv4 } from "uuid";

function generateId() {
    //  const uniqueId = uuidv4().toString();
     return uuidv4().toString()
  }
  

const initialState = {
    boardId: generateId(),
    title: '',
    sections: [],
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

        case DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                type
            } = action.payload;
            const newState = { ...state };

            //dragging lists around
            if (type === "section") {
                const section = newState.sections.splice(droppableIndexStart, 1);
                newState.sections.splice(droppableIndexEnd, 0, ...section);
                return newState;
            }

            //same list
            if (droppableIdStart === droppableIdEnd) {
                const section = newState.sections.find(section => droppableIdStart === section.id);
                const card = section.cards.splice(droppableIndexStart, 1);
                section.cards.splice(droppableIndexEnd, 0, ...card);
            }

            //other list
            if (droppableIdStart !== droppableIdEnd) {
                const section = newState.sections.find(section => droppableIdStart === section.id);
                const otherSection = newState.sections.find(section => droppableIdEnd === section.id);
                const card = section.cards.splice(droppableIndexStart, 1);
                if (!otherSection.cards) {
                    otherSection.cards = [...card]
                } else {
                    otherSection.cards.splice(droppableIndexEnd, 0, ...card);
                }
            }

            return newState;

        default:
            return state;
    }
};

export default board
