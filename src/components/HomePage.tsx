import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startAddTransaction, startAddUser, startClearData, startDeleteTransaction, startDeleteUser } from '../actions/actions';
import { v4 as uuid } from "uuid";
import { RootState } from "../store/index";
import { AppActions, Transaction, TransactionsState, User } from "../types/types";
import { AddTransaction } from "./AddTransaction";
import { Balance } from "./Balance";
import { TransactionList } from "./TransactionList";


interface HomePageProps {
    // Optional
    id?: string;
    colour?: string;
}

// State of entire redux store
interface HomePageState {

}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

export const HomePage = (props: Props, homePageState: HomePageState) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);


    const onRemove = (id: string) => {
        props.startDeleteTransaction(id);
    }

    const { transactions } = props;

    return (
        <div>
            <h1>Expenses Page</h1>
            <Balance transactions={transactions}/>
            <TransactionList transactions={transactions} callback={props.startDeleteTransaction}/>
            <AddTransaction callback={props.startAddTransaction} />
        </div>
    )
}

// Plain object containing the data our component needs
interface LinkStateProps {
    transactions: TransactionsState;
}

interface LinkDispatchProps {
    startDeleteTransaction: (id: string) => void;
    startAddTransaction: (transaction: Transaction) => void;
    startAddUser: (user: User) => void;
    startDeleteUser: (id: string) => void;
    startClearData: () => void;
}

// Called everytime store changes, and updates the local props (in this case transactions used in DOM) to the updated value in the updated store
const mapStateToProps = (state: RootState, ownProps: HomePageProps): LinkStateProps => ({
    transactions: state.transactions
});

// bindActionCreators -> binds action creator functions to be able to call dispatch directly
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps): LinkDispatchProps => ({
    startDeleteTransaction: bindActionCreators(startDeleteTransaction, dispatch),
    startAddTransaction: bindActionCreators(startAddTransaction, dispatch),
    startAddUser: bindActionCreators(startAddUser, dispatch),
    startDeleteUser: bindActionCreators(startDeleteUser, dispatch),
    startClearData: bindActionCreators(startClearData, dispatch),
});

// mapStateToProps -> gets called everytime store changes and subsequently updates the local transactions value
// mapDispatchToProps -> allows us to define functions that are automatically dispatched when called (i.e. startDeleteTransaction), as passes those functions as props to your component 
export default connect(
    mapStateToProps,
    mapDispatchToProps)(HomePage);