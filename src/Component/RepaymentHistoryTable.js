
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
import {setEmployeeNo} from "../Services/UserToken";
const useStyles = makeStyles({
  root: {
    width: "100%",
    boxShadow: "0px 4px 12px rgba(35, 209, 35, 0.31)",
    borderRadius: "20px",
  },
  container: {
    maxHeight: 540,
  },
});

export default function RepaymentHistoryTable(props) {
  const classes = useStyles();
  const [, setPage] = React.useState(0);
  const [, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = useState(false)


  const [LoanData, setLoanData] = useState([]);
  const [url, seturl] =useState(props.url || "")
  const [action, setaction] = useState(props.action || false)
  const [buttontext, setbuttontext] = useState(props.buttontext || "")

  const rows = LoanData;
  console.log(rows);
  console.log(props);

// "services_name": "Admin Logs",
// "action_perform": "Promise Ijeoma try to login, otp login code generate successful",
// "platform": "web or mobile",
///* ip_address 
  const getLoanData = () => {
      setloading(true)
    Api()
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setLoanData(response.data.data);
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
   
    getLoanData();
  }, []);

  var count = 1;

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            
              <TableCell align="center">S/N</TableCell>
              <TableCell align="center">Payment Date</TableCell>
              <TableCell align="center">Amount Pay</TableCell>
              <TableCell align="center">Pricipal Remain</TableCell>
              <TableCell align="center">Interest Remain</TableCell>
              <TableCell align="center">Total Amount Remain</TableCell>
              <TableCell align="center">Payment Ref.</TableCell>
              <TableCell align="center">Interest Rate</TableCell>
              <TableCell align="center">Loan Acc. No.</TableCell>
              <TableCell align="center">Start Date</TableCell>

              <TableCell align="center">Total Amount & Interest</TableCell>

              
              {/* department */}
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
                  {new Date(rows.payment_date).toDateString()}
                </TableCell>
                <TableCell>
                  {formatter.format(rows.amount_pay)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {formatter.format(rows.principal_remain)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(rows.interest_remain)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(rows.total_amount_remain)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.payment_ref}
                </TableCell>
                
                <TableCell component="th" scope="row">
                  {rows.loan && rows.loan.interest_rate
                    ? rows.loan.interest_rate+"%"
                    : "0"}
                </TableCell>
                <TableCell component="th" scope="row">
                {rows.loan && rows.loan.account_number
                    ? rows.loan.account_number
                    : "0.00"}
                </TableCell>
                <TableCell component="th" scope="row">
                {rows.loan && rows.loan.account_number
                    ? new Date(rows.loan.start_date).toDateString()
                    : "No Date"}
                </TableCell>
                <TableCell component="th" scope="row">
                {rows.loan && rows.loan.account_number
                    ? new Date(rows.loan.end_date).toDateString()
                    : "No Date"}
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
