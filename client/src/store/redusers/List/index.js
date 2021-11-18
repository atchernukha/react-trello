import { CREATE_ITEM, CREATE_LIST, DELETE_ITEM, DELETE_LIST, FETCH_ITEMS, FETCH_LISTS, } from "./types";

const initialState = {
    lists: [],
}

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ITEM:
            return { ...state, items: [...state.items, ...action.payload] };
        case DELETE_ITEM:
            return { ...state, items: action.payload };
        case FETCH_ITEMS:
            return fetchItemsReducer(state, action);
        case CREATE_LIST:
            return { ...state, lists: [...state.lists, action.payload] };
        case DELETE_LIST:
            return { ...state, lists: action.payload };
        case FETCH_LISTS:
            return { ...state, lists: action.payload };
        // case FILTER_PRODUCTS_BY_SIZE:
        //     return { ...state, size: action.payload.size, filteredItems: action.payload.items };
        // case ORDER_PRODUCTS_BY_PRICE:
        //     return { ...state, sort: action.payload.sort, filteredItems: action.payload.items };;
        default:
            return state;
    }
}

function fetchItemsReducer(state, action) {
    const { payload } = action;
    const updatedLists = state.lists
        .map(list => {
            if (list.id !== payload.listId) {
                return list;
            }

            return {
                ...list,
                items: payload.items
            }
        });

    return { ...state, lists: updatedLists };
}