import { CREATE_LIST, DELETE_LIST, FETCH_LISTS, UPDATE_LISTS, SET_DRAG_ITEM, SET_FROM_LIST } from "./types";

const initialState = {
    lists: [],
    draggingItem: null,
    fromList: null
}

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_LIST:
            return { ...state, lists: [...state.lists, action.payload] };
        case UPDATE_LISTS:
            return { ...state, lists: action.payload };
        case DELETE_LIST:
            return { ...state, lists: action.payload };
        case SET_DRAG_ITEM:
        return { ...state, draggingItem: action.payload };
        case SET_FROM_LIST:
            return { ...state, fromList: action.payload };
        case FETCH_LISTS:
            return { ...state, lists: action.payload };
        default:
            return state;
    }
}
