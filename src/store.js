import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers/rootReducer";
import { verifyAuth } from "./actions/";

export default function configureStore(persistedState) {
    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    store.dispatch(verifyAuth());
    return store;
}