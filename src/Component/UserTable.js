import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Api from "../Services/Api";
import LoadingTable from "./LoadingTable";
import {setUsersNo} from "../Services/UserToken";
const useStyles = makeStyles({
  root: {
    width: "100%",
    boxShadow: "0px 4px 12px rgba(35, 209, 35, 0.31)",
    borderRadius: "20px",
  },
  container: {
    maxHeight:540,
  },
});

export default function UserTable(props) {
  const classes = useStyles();
  const [, setPage] = React.useState(0);
  const [, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = useState(false)

//   "id": 10,
//       "first_name": "Promise",
//       "last_name": "Promise",
//       "email": "occc@gg.com",
//       "phone_number": "08012345678",
//       "department": "Account",
//       "role_id": 22,
//       "role_name": "Admin",
//       "created_at": "2021-01-12T12:21:53.000000Z",
//       "updated_at": "2021-01-23T03:59:52.000000Z",
//       "staff_id": "121",
//       "login_pin": null,
//       "lock": 0,
  const [LoanData, setLoanData] = useState([]);
  const [url, seturl] =useState(props.url || "")
  const [action, setaction] = useState(props.action || false)
  const [buttontext, setbuttontext] = useState(props.buttontext || "")

  const rows = LoanData;
  console.log(rows);
  console.log(props);


  const getLoanData = () => {
      setloading(true)
    Api()
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setLoanData(response.data.data);
        setUsersNo(response.data.data.length)
        setloading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setloading(false)
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    seturl(props.url)
    setaction(props.action)
    getLoanData();
  }, [url, action]);

  var count = 1;

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
//   ledger_balances: "300.00"
//   loan_credit_balance: null
//   lock: 0
//   referral_balances: null
//   total_balances: "300.00"
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S/N</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone No.</TableCell>
              <TableCell align="center">Ledger Balances</TableCell>
              <TableCell align="center">Loan Balances</TableCell>
              <TableCell align="center">Referral Balances</TableCell>
              <TableCell align="center">Total Balances</TableCell>
              {/* <TableCell align="center">Wallet Status</TableCell> */}
              <TableCell align="center">Status</TableCell>
              {action && <TableCell align="center">Action</TableCell> }
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(LoanData)}
            {LoanData.map((rows, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {count++}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows && rows.first_name + " " + rows.last_name
                    ? rows.first_name + " " + rows.last_name
                    : "Name is missing"}
                </TableCell>
                <TableCell>
                  {rows.email && rows.email
                    ? rows.email
                    : "Email is missing"}
                </TableCell>
                <TableCell component="th" scope="row">
                    {rows.phone_number}
                </TableCell>
                <TableCell component="th" scope="row">
                   {rows.wallet && rows.wallet.ledger_balances
                    ? formatter.format(rows.wallet.ledger_balances)
                    : "0.00"}
                </TableCell>
                <TableCell component="th" scope="row">
                   {rows.wallet && rows.wallet.loan_credit_balance
                    ? formatter.format(rows.wallet.loan_credit_balance)
                    : "0.00"}
                </TableCell>
                <TableCell component="th" scope="row">
                   {rows.wallet && rows.wallet.referral_balances
                    ? formatter.format(rows.wallet.referral_balances)
                    : "0.00"}
                </TableCell>
                <TableCell component="th" scope="row">
                   {rows.wallet && rows.wallet.total_balances
                    ? formatter.format(rows.wallet.total_balances)
                    : "0.00"}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                   {rows.wallet && rows.wallet.lock
                    ?  rows.wallet.lock ? (<Button variant="outlined" color="secondary">Lock</Button>) : (<Button variant="outlined" color="primary">Active</Button>)
                    : "Lock is missing"}
                </TableCell> */}
                <TableCell component="th" scope="row">
                    {rows.status ?(<Button variant="outlined" color="secondary">Lock</Button>) : (<Button variant="outlined" color="primary">Active</Button>)}
                </TableCell>
                {action && <TableCell component="th" scope="row">
                  {
                    <Button variant="contained" color="primary">
                     {buttontext}
                    </Button>
                  }
                </TableCell> }
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
            <br></br>
          {loading && <LoadingTable />}
        </div>  
      </TableContainer>
    </Paper>
  );
}
