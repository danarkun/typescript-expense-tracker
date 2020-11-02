import React, {useState, useContext, FunctionComponent} from 'react'
import { startAddTransaction, startAddUser, startClearData, startDeleteTransaction, startDeleteUser } from '../actions/actions';
import { connect } from "react-redux";
import { AppActions } from '../types/types';

type AddTransactionProps = {
  callback: Function
}

export const AddTransaction: FunctionComponent<AddTransactionProps> = (props) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    props.callback(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}