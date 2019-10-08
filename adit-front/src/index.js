import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const history = createBrowserHistory();
const rootReducer = combineReducers({
    router: connectRouter(history)
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunk, routerMiddleware(history))
);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
