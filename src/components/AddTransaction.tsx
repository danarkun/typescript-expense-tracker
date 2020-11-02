import React, { useState } from 'react'
import { startAddTransaction } from '../actions/actions';
import { connect } from "react-redux";
import { AppActions, Transaction, TransactionsState } from '../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { v4 as uuid } from "uuid";
import { RootState } from '../store';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';
import { useHistory } from 'react-router-dom';


type Props = LinkDispatchProps;

export const AddTransaction = (props: Props) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      id: uuid(),
      text,
      amount: +amount
    }
    props.startAddTransaction(newTransaction)
      // .then(() => {
      //   history.push("./Home");
      // })
      // .then(() => {
      //   ResetForm();
      // })
      // .catch((err) => {
      //   console.error(`AddTransaction promise error: ${err}`);
      // })
  }

  const [selectedUser, setSelected] = useState(false);
  // Default to "select user" option
  const [userID, setUser] = useState("default");

  // const classes = useStyles();
  const history = useHistory();

  function ResetForm() {
    setText('');
    setAmount(parseInt(''));
  }

  function generateID() {
    return Math.floor(Math.random() * 1000000)
  }

  // function SelectUser(user) {
  //     setUser(user);
  //     setSelected(true);
  // }

  return (
    <div className="component">
      <h3>Add new transaction</h3>
      <form name="transForm" id="transForm" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text"><b>Text</b></label><br />
          <TextField variant="outlined" type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="Enter text..." required />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
          ><b>Amount</b> <br />(Negative: expense, Positive: income)</label><br />
          <TextField variant="outlined" type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))} placeholder="Enter amount..." required />
        </div>
        <div className="formcontrol">
          <label htmlFor="user"><b>Assign User</b></label><br />


          {/* <FormControl variant="outlined" className={classes.formControl}>
            <Select
              id="user"
              name="user"
              value={userID}
              onChange={e => SelectUser(e.target.value)}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              required
            >
              <MenuItem value="default" disabled>
                Select User
                            </MenuItem>
            </Select>
            <FormHelperText>User</FormHelperText>
          </FormControl> */}
        </div>
        <button className="btn">Add transaction</button>
        {/* <input type="submit" id="subButton" className={`${userList.length === 0 ? "blocked" : ""} btn`} value={userList.length === 0 ? "Add Atleast One User" : "Add transaction"}></input> */}
      </form>
    </div>
  )
}

interface LinkDispatchProps {
  startAddTransaction: (transaction: Transaction) => void;
}

interface LinkStateProps {
  transactions: TransactionsState;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
  transactions: state.transactions
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startAddTransaction: bindActionCreators(startAddTransaction, dispatch),
})

// Everyone importing this file takes this connect as opposed to AddTransaction itself
export default connect(
  mapStateToProps,
  mapDispatchToProps)(AddTransaction);

// return (
//   <>
//     <h3>Add new transaction</h3>
//     <form onSubmit={onSubmit}>
//       <div className="form-control">
//         <label htmlFor="text">Text</label>
//         <input type="text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="Enter text..." />
//       </div>
//       <div className="form-control">
//         <label htmlFor="amount"
//         >Amount <br />
//                     (negative - expense, positive - income)</label>
//         <input type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))} placeholder="Enter amount..." />
//       </div>
//       <button className="btn">Add transaction</button>
//     </form>
//   </>
// )