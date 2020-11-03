import { connect } from 'react-redux';
import React, { useState, useEffect, useContext, FC } from 'react'
import { useLocation, useHistory, NavLink } from "react-router-dom";
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { startDeleteTransaction } from '../actions/actions';
import { RootState } from '../store';
import { Transaction, TransactionsState, User, UsersState } from '../types/types';
import { TransactionItem } from './TransactionItem';
import { JsxElement } from 'typescript';

type Props = LinkStateProps & LinkDispatchProps;

export const TransactionViewer: FC<Props> = (props) => {

    const { users, transactions, startDeleteTransaction } = props;

    const location = useLocation();
    const [transaction, setTransaction] = useState(VerifyState());


    const history = useHistory();

    useEffect(() => {
        // Get transaction that we've been passed from clicked Transaction component
        setTransaction(VerifyState);

        return () => {
            // Cleanup code
        }
    }, [location])

    function DeleteTransaction(): void {
        startDeleteTransaction(transaction.id);
        history.push("./Home");
        // .then(() => {
        //     history.push("./Home");
        // })
    }

    function VerifyState() {
        if (location.search == '?transaction') {
            return location.state;
        }
        return;
    }

    function GetComponentToDraw(): JSX.Element {
        // If coming from clicking Transaction Viewer, need to select a transaction from drop down
        if (location.search == '?transaction') {
            if (transaction == null)
                return <p>Loading...</p>
            else
                return <TransactionSelectedItem />;
        }
        else {
            return <TransactionDropDown />
        }
    }

    function GetUserLink(): JSX.Element {
        const user: User | undefined = users.users.find(x => x.id == transaction.user);

        if (user == null) {
            return <p>deleted user</p>
        }
        else {
            return <NavLink to={{
                pathname: "/UserViewer",
                search: `${user.id}`,
                state: { detail: user }
            }}>{`${user.fname} ${user.lname}`}
            </NavLink>
        }
    }

    function SetSelectedTransaction(transactionId: string) {
        let ret = transactions.transactions.find(t => t.id == transactionId)
        history.push("/TransactionViewer?transaction", ret);
    }

    const TransactionDropDown = () => {
        return (
            <select value={transaction} defaultValue="" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { SetSelectedTransaction(e.target.value as string) }}>
                <option value="" disabled>Select Transaction</option>
                {transactions.transactions.map(t => (<TransactionItem key={t.id} transaction={t} />))}
            </select>
        )
    }

    const TransactionSelectedItem = () => {
        return (
            <div>
                <p><b>Transaction: </b>{transaction.text}</p>
                <p><b>Transaction Amount: </b>{transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}</p>
                <b>Submitted by: </b><GetUserLink />
                <p><b>Submitted at : </b>{transaction.timeStamp == undefined ? "Unknown time" : transaction.timeStamp.toString()}</p>

                <button className="btn deleteButton" onClick={() => DeleteTransaction()}>DELETE TRANSACTION</button>
            </div>
        )
    }

    return (
        <div className="component">
            <h1>TRANSACTION VIEWER</h1>
            <br />
            <GetComponentToDraw />
        </div>
    )
}

interface LinkStateProps {
    transactions: TransactionsState;
    users: UsersState;
}

interface LinkDispatchProps {
    startDeleteTransaction: (id: string) => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    transactions: state.transactions,
    users: state.users
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): LinkDispatchProps => ({
    startDeleteTransaction: bindActionCreators(startDeleteTransaction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionViewer);