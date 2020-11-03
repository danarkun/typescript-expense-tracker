import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions } from '../types/types';
import { transactionReducer, userReducer } from '../reducers/reducers';

const rootReducer = combineReducers({
    transactions: transactionReducer,
    users: userReducer,
    // generic: dataReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, AppActions>))