import React, { FC, useContext } from 'react';
import { TransactionsState, Transaction } from '../types/types';
import { TransactionItem } from './TransactionItem';

interface TransactionListProp {
  transactions: TransactionsState;
  callback: Function
}

export const TransactionList:FC<TransactionListProp> = (props) => {
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {props.transactions.transactions.map(transaction => (<TransactionItem key={transaction.id} transaction={transaction} callback={props.callback} />))}
      </ul>
    </>
  )
}
