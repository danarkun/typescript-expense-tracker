import { MenuItem } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { transactionReducer } from '../reducers/reducers';
import { Transaction } from '../types/types';

interface TransactionItemProp {
  transaction: Transaction;
}

export const TransactionItem: FC<TransactionItemProp> = (props) => {
  const { transaction } = props;

  return (
    <option value={transaction.text}>{transaction.text}</option>
  )
}