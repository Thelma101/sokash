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
import LoanDeatils from "./LoanDetails";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {getUserDetails} from "../Services/UserToken"

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

export default function LoanTable(props) {
  const classes = useStyles();
  const [, setPage] = React.useState(0);
  const [, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = useState(false);
  const [LoanData, setLoanData] = useState([]);
  const [url, seturl] = useState(props.url || "");
  const [action, setaction] = useState(props.action || false);
  const [buttontext, setbuttontext] = useState(props.buttontext || "");
  const [loanid, setloanid] = useState("")


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  console.log(open);
  const [loandetails, setloandetails] = React.useState({})
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [urlloan, seturlloan] = useState("/loans/");
  // const [action, setaction] = useState(props.action || false);
  // const [buttontext, setbuttontext] = useState(props.buttontext || "");
  // const [loading, setloading] = useState(false);

  const rows = LoanData;
  console.log(rows);
  console.log(props);
  const handleClickOpen = () => {
   
    setOpen(true);
  };
// console.log("admin id"+getUserDetails().admin_id  "")
  const handleClose = () => {
    setOpen(false);
  };

  const changeLoanStatus=(actions, userId)=>{
    setloading(true);
    Api()
    .post(actions != "none"? "/loans/reject_or_approve":"/loans/disburse_loan", 
      {
      action : actions,
      loan_id : loanid,
      user_id: userId,
      admin_id: getUserDetails().admin_id,
    })
    .then(function (response) {
      // handle success
      {actions != "none" ? setloandetails(response.data.data):
        setloandetails(response.data.data.loan)}
      
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
  }
  const getLoanOne = () => {
    setloading(true);
    Api()
      .get(urlloan+loanid)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        console.log(urlloan+loanid)
        setloandetails(response.data.data[0]);
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
  
  
  const getLoanData = () => {
    setloading(true);
    Api()
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        console.log(urlloan+loanid)

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
    if(loanid != ""){
    getLoanOne(loanid);
    }
    getLoanData();

  }, [loanid]);
 const [showLoan, setshowloan] = useState(false);
  var count = 1;
  // const loanmodal = (id)=>{
  //   setloanid(id)
  //   console.log("hhhjh modal")
  //   setshowloan(true)
  // }
  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S/N</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
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
                  {rows.user && rows.user.first_name + " " + rows.user.last_name
                    ? rows.user.first_name + " " + rows.user.last_name
                    : "Email is missing"}
                </TableCell>
                <TableCell>
                  {rows.user && rows.user.email
                    ? rows.user.email.substring(0, 17) + "..."
                    : "Email is missing"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rows.user && rows.user.address
                    ? rows.user.address.substring(0, 17) + "..."
                    : "Address is missing".substring(0, 17) + "..."}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(rows.amount)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(rows.created_at).toDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button variant="outlined" color="secondary">
                    {rows.status}
                  </Button>
                </TableCell>
                {action && (
                  <TableCell component="th" scope="row">
                    {buttontext === "approve" ? 
                     <>
                       <Button onClick={() => {setloanid(rows.id); handleClickOpen()}} variant="contained" color="secondary">
                         Reject
                       </Button>
                       <br></br>
                      <Button variant="contained" color="primary" onClick={() => {setloanid(rows.id); handleClickOpen()}}>
                     {buttontext} 
                    </Button> </> : 
                    <Button variant="contained" color="primary" onClick={() => {setloanid(rows.id); handleClickOpen()}}>
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
      {/* {showLoan && <LoanDeatils open={true} />}
      <LoanDeatils loanid={loanid} open={true} buttontext={buttontext} /> */}
    </Paper>
{/* //modal  */}

{/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Loan Details</DialogTitle>
        {loading ? "Loading...": 
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Grid container spacing={3}>
              
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Loan Amount
              </Typography>
              
              <Typography variant="caption" display="block" gutterBottom>
                {formatter.format(loandetails.amount)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Tenure
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.tenure}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Tenure Type
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.tenure_type}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Interest Rate
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.interest_rate}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Interest Rate Type
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.interest_rate_type}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Status
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
             
              <Button variant="outlined" color="primary"> {loandetails.status}</Button> 
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Account Number
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.account_number}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Reason
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.reason}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Start Date
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {new Date(loandetails.start_date).toDateString()}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               End Date
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {new Date(loandetails.end_date).toDateString()}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Total Amount And Interest
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {formatter.format(loandetails.total_amount_and_interest)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Interest
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.interest}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Amount Remain
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {formatter.format(loandetails.amount_remain)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Interest Remain
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {formatter.format(loandetails.interest_remain)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Pricipal Remain
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {formatter.format(loandetails.principal_remain)}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Loan Type
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.loan_type}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Bussiness Description
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.business_description}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Type of Bussiness
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.type_of_business}
              </Typography>
            </Grid>
           
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Bussiness Name
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.bussiness_name}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                First Name
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.first_name : "none"}

              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Last Name
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.last_name : "none"}
              </Typography>
            </Grid>
            </Grid>
            <hr></hr>
             <Grid container spacing={3}>
                 
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.email : "none"}     
             </Typography>
            </Grid>

            <Grid item xs>
              <Typography variant="h6" gutterBottom>
               Phone Number
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.phone_number : "none"}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.address : "none"}             </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Kyc Level
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.kyc_level : "none"}
              </Typography>
            </Grid>
            </Grid>   
            <hr></hr>
            <Grid container spacing={3}>
                
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Date Of Birth
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? new Date(loandetails.user.date_of_birth).toDateString() : "none"}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Gender
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.gender : "none"}  
            </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" gutterBottom>
                Marita Status
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
              {loandetails.user ? loandetails.user.marital_status : "none"}
              </Typography>
            </Grid>
            
            
          </Grid>
        </DialogContent>
        } 
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {buttontext === "approve" ?
          <>
          <Button variant="contained" onClick={() => changeLoanStatus("reject", loandetails.user.id)} color="secondary">
            Reject
          </Button>
          <Button variant="contained" onClick={() => changeLoanStatus("approve", loandetails.user.id)} color="primary">
            {buttontext}
          </Button>
          </> :
          <Button variant="contained" onClick={() => changeLoanStatus("none",loandetails.user.id)} color="primary">
          {buttontext}
        </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
