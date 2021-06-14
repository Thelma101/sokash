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
import { setLoansNo } from "../Services/UserToken";

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

export default function LoanProductTable(props) {
  const classes = useStyles();
  const [, setPage] = React.useState(0);
  const [, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = useState(false);

  

  const [LoanData, setLoanData] = useState([]);
  const [url, seturl] = useState(props.url || "");
  const [action, setaction] = useState(props.action || false);
  const [buttontext, setbuttontext] = useState(props.buttontext || "");

  const rows = LoanData;
  console.log(rows);
  console.log(props);

  const getLoanData = () => {
    setloading(true);
    Api()
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setLoanData(response.data.data);
        {
          url === "/loans?paginate=NOONE" &&
            setLoansNo(response.data.data.length);
        }
        setloading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setloading(false);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    seturl(props.url);
    setaction(props.action);
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

  // "name": "string",
  //     "min_amount": 0,
  //     "max_amount": 0,
  //     "penalty": "string",
  //     "tenure_type": "string",
  //     "min_credit_score": 0,
  //     "min_kyc_level": 0,
  //     "process_fees": "string",
  //     "system_can_approved": true,
  //     "max_tenure": 0,
  //     "interest_rate": 0,
  //     "interest_rate_type": "string",
  //     "loan_type": "string",

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          
            <TableRow>
              <TableCell align="center">S/N</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Min Amount</TableCell>
              <TableCell align="center">Max Amount</TableCell>
              <TableCell align="center">Penalty</TableCell>
              <TableCell align="center">Tenure Type</TableCell>
              <TableCell align="center">Min Credit Score</TableCell>
              <TableCell align="center">Min KYC Level</TableCell>
              <TableCell align="center">Process Fees</TableCell>
              <TableCell align="center">Systerm Can Approve</TableCell>
              <TableCell align="center">Max Tenure</TableCell>
              <TableCell align="center">Interest Rate</TableCell>
              <TableCell align="center">Interest Rate Type</TableCell>
              <TableCell align="center">Loan Type</TableCell>
              {action && <TableCell align="center">Action</TableCell>}
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
                  {rows.name}
                </TableCell>
                <TableCell>
                  {formatter.format(rows.min_amount)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(rows.max_amount)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.penalty}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.tenure_type}
                </TableCell>
                <TableCell component="th" scope="row">
                {rows.min_credit_score}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.min_kyc_level}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(rows.process_fees)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.system_can_approved}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.max_tenure}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.interest_rate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.interest_rate_type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.loan_type}
                </TableCell>
                {action && (
                  <TableCell component="th" scope="row">
                    {
                      <Button variant="contained" color="primary">
                        {buttontext}
                      </Button>
                    }
                  </TableCell>
                )}
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
