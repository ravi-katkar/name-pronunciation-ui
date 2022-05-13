import { SET_SEARCH_RESULTS } from "../actions/search.action";

const initialState = {
    searchResults: []
}

export const searchReducer = (state={...initialState}, action) => {
    switch(action.type){
        case SET_SEARCH_RESULTS: return {...state, searchResults:action.searchResults}
        default: return {...state}
    }
}
