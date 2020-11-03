import React, {FC, useContext} from 'react';
import { Transaction } from '../types/types';

interface TransactionItemProp {
  transaction: Transaction;
  callback(id: string): void;
}

export const TransactionItem: FC<TransactionItemProp> = (props) => {

  const sign = props.transaction.amount < 0 ? '-' : '+';

  return (
    <li className={props.transaction.amount < 0 ? 'minus' : 'plus'}>
      {props.transaction.text} <span>{sign}${Math.abs(props.transaction.amount)}</span><button onClick={() => props.callback(props.transaction.id)} className="delete-btn">x</button>
    </li>
  )
}
