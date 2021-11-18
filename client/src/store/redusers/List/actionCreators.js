import axios from "axios";
import { CREATE_ITEM, CREATE_LIST, DELETE_ITEM, DELETE_LIST, FETCH_ITEMS, FETCH_LISTS } from "./types";

const baseURL = process.env.REACT_APP_API_HOST + 'api'

export const ListActionCreators = {
    createList: list => async dispatch => {
        try {
            const { data } = await axios.post(baseURL + '/list', { name: list })
            dispatch({ type: CREATE_LIST, payload: data })
        } catch (e) {
            console.error('Create list error.......', e)
        }
    },
    fetchList: () => async dispatch => {
        try {
            const { data } = await axios.get(baseURL + '/list')
            dispatch({ type: FETCH_LISTS, payload: data })
        } catch (e) {
            console.error('Fetch list error.......', e)
        }
    },
    deleteList: (id) => async (dispatch, getState) => {
        try {
            const { data } = await axios.delete(baseURL + '/list', id)
            const lists = getState().lists
            dispatch({ type: DELETE_LIST, payload: lists.map(type => type.id !== id) })
            return data
        } catch (e) {
            console.error('Delete list error.......', e)
        }
    },
    createItem: item => async dispatch => {
        try {
            const { data } = await axios.post(baseURL + '/item', { name: item })
            dispatch({ type: CREATE_ITEM, data })
        } catch (e) {
            console.error('Create item error.......', e)
        }
    },
    fetchItems: id => async (dispatch, getState) => {
        try {
            const { data } = await axios.get(baseURL + '/item' + `?listId=${id}`)
            const lists = getState().lists.lists
                .map(list => (list.id === id)? ({...list, items: data}):list)
                //     {
                //     if (list.id !== id) {
                //         return list;
                //     }

                //     return {
                //         ...list,
                //         items: data
                //     }
                // });
                console.log(lists)
            // dispatch({ type: FETCH_ITEMS, payload: { listId: id, items: data } })
            dispatch({ type: FETCH_LISTS, payload: lists })
        } catch (e) {
            console.error('Fetch items error.......', e)
        }
    },
    deleteItem: (id) => async (dispatch, getState) => {
        try {
            const { data } = await axios.delete(baseURL + '/item', id)
            const items = getState().items
            dispatch({ type: DELETE_ITEM, payload: items.map(item => item.id !== id) })
        } catch (e) {
            console.error('Delete item error.......', e)
        }
    },
    // filterProducts: (products, size) => dispatch => {
    //     dispatch({
    //         type: FILTER_PRODUCTS_BY_SIZE,
    //         size: size,
    //         items: size === ""
    //             ? products
    //             : products.filter(x => x.availableSizes.indexOf(size) >= 0)

    //     })
    // },
    // orderProductsByPrice: (filteredProducts, sort) => dispatch => { 
    //     const sortedProducts = filteredProducts.slice();
    //     if (sort === "latest") {
    //         sortedProducts.sort((a, b) => a.id > b.id ? 1 : -1)
    //     } else {
    //         sortedProducts.sort((a, b) => (
    //             sort === "lowest"
    //                 ? a.price > b.price ? 1 : -1
    //                 : a.price > b.price ? -1 : 1
    //         ))
    //     }
    //     dispatch({
    //         type: ORDER_PRODUCTS_BY_PRICE, 
    //         sort: sort,
    //         items: sortedProducts
    //     })
    // }
}