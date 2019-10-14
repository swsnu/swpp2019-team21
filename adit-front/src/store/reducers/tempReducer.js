import * as actionTypes from '../actions/actionTypes';
import axios from 'axios'
const initialState = {
    
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        // example action
        /*case actionTypes.ADD_ARTICLE : 
            return {...state, articles: state.articles.concat(action.article), lastlysubmittedArticle: action.article}*/
        default:
            break;
    }
    return state;
}
export default reducer;