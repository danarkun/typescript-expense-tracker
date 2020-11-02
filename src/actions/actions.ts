import { Transaction, ADD_TRANSACTION, DELETE_TRANSACTION, TransactionActionTypes, AppActions, ADD_USER, User, DELETE_USER, CLEAR_DATA } from '../types/types'
import { Dispatch } from "react";
import { RootState } from '../store';
import { v4 as uuid } from "uuid";

// ACTION CREATORS
// Returns an ExpenseActionType (inferred by AddTransactionActionTypes)
export const addTransaction = (transaction: Transaction): AppActions => ({
        type: ADD_TRANSACTION,
        payload: transaction
});

export const deleteTransaction = (id: string): AppActions => ({
        type: DELETE_TRANSACTION,
        payload: id
});

export const addUser = (user: User): AppActions => ({
    type: ADD_USER,
    payload: user
});

export const deleteUser = (id: string): AppActions => ({
    type: DELETE_USER,
    payload: id
})

export const clearData = (): AppActions => ({
    type: CLEAR_DATA
})

// WRAPPING ACTION CREATORS IN FUNCTIONS TO MAP TO DISPATCH
export const startAddTransaction = ( transaction: Transaction) => {
    return (dispatch: Dispatch<AppActions>, getState:() => RootState) => {
        
        console.log("HITTING ");
        // Set text and amount from transactionData parameter
       

        // Pass our new id along with new transaction as an object to addTransaction(...) 
        dispatch(addTransaction(
            transaction
        ))
    }
}

export const startDeleteTransaction = ( id: string ) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(deleteTransaction(id));
    }
}

export const startAddUser = (user: User) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(addUser(user));
    }
}

export const startDeleteUser = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(deleteUser(id));
    }
}

export const startClearData = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(clearData());
    }
}