import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TransactionsTable from "../Component/TransactionsTable";

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
export default function Transactions(props) {
  const classes = useStyles();

  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#FF0000"} name={"Transactions"} number={"40,000"}/>
        </Grid>
        <Grid item xs>
.
        </Grid>
    </Grid>
    <p className="dashboardtitle"> Transactions </p>
     <Paper className={classes.paper}>
        <TransactionsTable url="/transactions?paginate=jjjkj" action={false} style={{padding: "1px"}}/>
      </Paper>
    
    </>
  );
}
