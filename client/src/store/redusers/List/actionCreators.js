import axios from "axios";
import timeSince from "./timeSinse";
import { CREATE_LIST, SET_DRAG_ITEM, SET_FROM_LIST, FETCH_LISTS, UPDATE_LISTS } from "./types";

const baseURL = process.env.REACT_APP_API_HOST + 'api'

export const ListActionCreators = {
    createList: listName => async dispatch => {
        try {
            const { data } = await axios.post(baseURL + '/list', { "name": listName })
            dispatch({ type: CREATE_LIST, payload: data })
        } catch (e) {
            console.error('Create list error.......', e)
        }
    },
    fetchList: () => async dispatch => {
        try {
            const { data } = await axios.get(baseURL + '/list')
            const sortedList = data.sort(
                (a,b) => a.sortOrder < b.sortOrder
            )
            dispatch({ type: FETCH_LISTS, payload: sortedList })
        } catch (e) {
            console.error('Fetch list error.......', e)
        }
    },
    deleteList: list => async (dispatch, getState) => {
        try {
            const { data } = await axios.delete(baseURL + '/list/' + list.id)
            const lists = getState().lists
            const newLists = lists.lists.filter(l => l.id !== list.id)
            dispatch({ type: UPDATE_LISTS, payload: newLists })
            return data
        } catch (e) {
            console.error('Delete list error.......', e)
        }
    },
    createItem: (itemName, list) => async (dispatch, getState) => {
        try {
            const { data } = await axios.post(baseURL + '/item', { name: itemName, listId: list.id, sortOrder: list.items.length })
            const lists = getState().lists.lists
            const newItems = [...list.items, data]
            const newList = { ...list, items: newItems }
            const newLists = lists.map(l => (list.id === l.id) ? newList : l);
            dispatch({ type: UPDATE_LISTS, payload: newLists })
        } catch (e) {
            console.error('Create item error.......', e)
        }
    },
    dragStartItem: (item, list) => async dispatch => {
        try {
            dispatch({ type: SET_DRAG_ITEM, payload: item })
            dispatch({ type: SET_FROM_LIST, payload: list })
        } catch (e) {
            console.error('Drag start item error.......', e)
        }
    },
    moveItem: (toList, toItem = null) => async (dispatch, getState) => {
        try {
            const lists = getState().lists.lists
            const droppingItem = getState().lists.draggingItem
            const fromList = getState().lists.fromList

            const newItems = fromList.items.filter(i => i.id !== droppingItem.id)
            const newList = { ...fromList, items: newItems }
            const newLists = lists.map(l => (l.id === fromList.id) ? newList : l)

            const toItemsFiltered = toList.items.filter(x => x.id !== droppingItem.id)
            let newItems1
            const index = (!!toItem)? toItemsFiltered.findIndex(x => x.id === toItem.id) + 1: toList.items.length
            if(!!toItem) {
                newItems1 = [...toItemsFiltered]
                newItems1.splice(index , 0, droppingItem)    
            } else {
                newItems1 = [...toItemsFiltered, droppingItem]
            }
            
            const sortArray = newItems1?.map((x,index) => ({...x,sortOrder: index}))
            const newList1 = { ...toList, items: sortArray }

            console.log("Items = ", newList1.items)
            console.log("sortArray = ", sortArray)
            const newLists1 = newLists.map(l => (l.id === toList.id) ? newList1 : l)

            await axios.put(baseURL + '/item', { ...droppingItem, sortOrder: index, listId: toList.id, sortArray: sortArray }) 
            dispatch({ type: UPDATE_LISTS, payload: newLists1 })

        } catch (e) {
            console.error('Move item error.......', e)
        }
    },
    fetchItems: id => async (dispatch, getState) => {
        try {
            const { data } = await axios.get(baseURL + '/item', {
                params: {
                    listId: id
                }
            })
            const listWithTimeSince = data.map(item => ({ ...item, updatedAt: timeSince(Date.parse(item.updatedAt)) + " ago" }))
            const lists = getState().lists.lists.map(list => 
                            (list.id === id) ? ({ ...list, items: listWithTimeSince }) : list)
            dispatch({ type: FETCH_LISTS, payload: lists })
        } catch (e) {
            console.error('Fetch items error.......', e)
        }
    },
    deleteItem: (id, list) => async (dispatch, getState) => {
        try {
            await axios.delete(baseURL + '/item/' + id)
            const lists = getState().lists.lists
            const newItems = list.items.filter(item => item.id !== id)
            const newList = { ...list, items: newItems }
            const newLists = lists.map(l => (list.id === l.id) ? newList : l);
            dispatch({ type: UPDATE_LISTS, payload: newLists })
        } catch (e) {
            console.error('Delete item error.......', e)
        }
    },

}