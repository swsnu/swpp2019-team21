import { createStore, combineReducers } from 'redux';
import tempReducer from './store/reducers/tempReducer.js';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] Next State', store.getState());
            return result;
        };
    };
};

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    tem: tempReducer,
    router: connectRouter(history)
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history))
);

export default store;
