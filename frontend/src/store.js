import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {
    adpost_reducer,
    adreception_reducer,
    user_reducer,
    tag_reducer
} from './store/reducers';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import SecureLS from 'secure-ls';
export const history = createBrowserHistory();
export const ls = new SecureLS();

const rootReducer = combineReducers({
    adpost: adpost_reducer,
    adreception: adreception_reducer,
    user: user_reducer,
    tag: tag_reducer,
    router: connectRouter(history)
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
