import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import Reducers from './reducers/index';

const middleware = [reduxThunk];

const initialState = {};

const store = createStore( 
    Reducers,
    initialState,
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :  f => f
    )
)

export default store;
