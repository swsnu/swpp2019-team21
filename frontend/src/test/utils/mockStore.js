import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../../store';

const mockfunction = jest.fn(initialState => (state, action) => {
    return initialState;
});
export const getMockStore = initialState => {
    const mockAdPostReducer = mockfunction(initialState);
    const mockAdReceptionReducer = mockfunction(initialState);
    const mockUserReducer = mockfunction(initialState);
    const mockTagReducer = mockfunction(initialState);
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
