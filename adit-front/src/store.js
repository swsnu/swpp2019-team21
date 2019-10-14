
import {createStore, combineReducers} from 'redux';
//import articleReducer from './store/article'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    //red: reducer name,
})

const logger = store => {
        return next => {
        return action => {
        //console.log('[Middleware] Dispatching', action);
        const result = next(action);
        //console.log('[Middleware] Next State', store.getState());
        return result;
    }
}};
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
