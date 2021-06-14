import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LoanTable from "../Component/LoansTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: "1%",
    padding: theme.spacing(2),
    textAlign: "left",
    border: "1px solid #E3EBF6",
    boxSizing: "border-box",
    borderRadius: "10px",
  },
}));
export default function LoanPendingDisbursed(params) {
  
  const classes = useStyles();

  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#0B9057"} name={"All Loan"} number={"4,000"}/>
        </Grid>
        <Grid item xs>
        </Grid>
    
    </Grid>
    <p className="dashboardtitle">Loan Pending Disbursed </p>
     <Paper className={classes.paper}>
         <LoanTable url="/loans/by_status/approve?paginate=jjjkj" buttontext="disburse" action={true} style={{padding: "1px"}}/>
      </Paper>
    
    </>
  );
}
