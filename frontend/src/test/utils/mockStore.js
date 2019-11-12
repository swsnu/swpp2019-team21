import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../../store';

const getAdPostReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getAdReceptionReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getUserReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getTagReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = initialState => {
    const mockAdPostReducer = getAdPostReducer(initialState);
    const mockAdReceptionReducer = getAdReceptionReducer(initialState);
    const mockUserReducer = getUserReducer(initialState);
    const mockTagReducer = getTagReducer(initialState);
    const rootReducer = combineReducers({
        adpost: mockAdPostReducer,
        adreception: mockAdReceptionReducer,
        user: mockUserReducer,
        tag: mockTagReducer,
        router: connectRouter(history)
    });
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    return mockStore;
};
