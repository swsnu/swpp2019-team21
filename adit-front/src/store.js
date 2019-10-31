import { createStore, combineReducers } from 'redux';
import {
    adpost_reducer,
    adreception_reducer,
    user_reducer,
    tag_reducer
} from './store/reducers';
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
    adpost: adpost_reducer,
    adreception: adreception_reducer,
    user: user_reducer,
    tag: tag_reducer,
    router: connectRouter(history)
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history))
);
