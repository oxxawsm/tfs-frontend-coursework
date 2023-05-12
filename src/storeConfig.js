import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(persistedState) {
    const storeConfig = createStore(
        persistedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    return storeConfig;
}