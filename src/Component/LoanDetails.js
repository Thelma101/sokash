import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Api from "../Services/Api";
import LoadingTable from "./LoadingTable";

export default function LoanDeatils(props) {
    const theme = useTheme();
  const [open, setOpen] = React.useState(props.open || false);
  console.log(props.open);
  const [loandetails, setloandetails] = React.useState({})
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [url, seturl] = useState(props.url || "/loans/2");
  const [action, setaction] = useState(props.action || false);
  const [buttontext, setbuttontext] = useState(props.buttontext || "");
  const [loading, setloading] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getLoanData = () => {
    setloading(true);
    Api()
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
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
  useEffect(() => {
    getLoanData();
  }, []);

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
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
              {loandetails.status}
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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            {buttontext}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
