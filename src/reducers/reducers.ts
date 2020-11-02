import { TransactionActionTypes, TransactionsState, ADD_TRANSACTION, DELETE_TRANSACTION } from '../types/types';

const initialState: TransactionsState = {
    transactions: [
        {
            id: "1",
            text: "First Transaction",
            amount: 100
        }
    ]
}

// Reducer takes in a state and action (type of which is any of the defined transactions types) and returns a new TransactionsState
export function transactionReducer(state = initialState, action: TransactionActionTypes): TransactionsState {
    switch (action.type) {
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload)
            }
        default:
            return state;
    }
}