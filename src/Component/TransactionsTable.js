
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

export default function TransactionsTable(props) {
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
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Trans Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">currency</TableCell>

              <TableCell align="center">name</TableCell>
               <TableCell align="center">Email</TableCell>
               <TableCell align="center">Phone No.</TableCell>

              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Reason.</TableCell>
              <TableCell align="center">Trans Id</TableCell>
              <TableCell align="center">Ref.</TableCell>    
              {/* <TableCell align="center">Auth Code</TableCell>
              <TableCell align="center">Access Code</TableCell>
              <TableCell align="center">Auth Url</TableCell> */}
             
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
                  { formatter.format(rows.amount)}
                </TableCell>
                <TableCell>
                  {rows.transaction_type}
                </TableCell>
                <TableCell component="th" scope="row">
                {rows.status == 'pending' &&(<Button variant="outlined" color="secondary">
                    {rows.status}
                  </Button>)}
                  {rows.status == 'success' &&(<Button variant="outlined" style={{color: "#007945"}}>
                    {rows.status}
                  </Button>)}
                  {rows.status == 'approved' &&(<Button variant="outlined" color="primary">
                    {rows.status}
                  </Button>)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.currency}
                </TableCell>

                <TableCell component="th" scope="row">
                {rows.user && rows.user.first_name+" "+rows.user.last_name
                    ? rows.user.first_name+" "+rows.user.last_name
                    : "No name"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.user && rows.user.email
                    ? rows.user.email
                    : "No Email"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.user && rows.user.phone_number
                    ? rows.user.phone_number
                    : "No Phone Number"}
                </TableCell>
                
                <TableCell component="th" scope="row">
                  {new Date(rows.created_at).toDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                    {rows.reasons}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.transaction_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.reference}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {rows.authorization_code}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.access_code}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.authorization_url}
                </TableCell> */}
              
                
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
