import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TransactionsTable from "../Component/TransactionsTable";
import RepaymentHistoryTable from "../Component/RepaymentHistoryTable";

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
export default function RepaymentHistory(props) {
  const classes = useStyles();

  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs>
          {/* <Cards color={"#FF0000"} name={"Loan Missed"} number={"40,000"}/> */}
        </Grid>
        <Grid item xs>
.
        </Grid>
    </Grid>
    <p className="dashboardtitle"> Repayment History </p>
     <Paper className={classes.paper}>
        <RepaymentHistoryTable url="/repayment_histories?paginate=jjjkj" action={false} style={{padding: "1px"}}/>
      </Paper>
    
    </>
  );
}
