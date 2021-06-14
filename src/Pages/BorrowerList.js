import React, {useEffect, useState} from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BorrowerListCharts from "../Component/BorrowerList/BorrowerChart";
import LoanTable from "../Component/LoansTable";
import {getLoansNo} from "../Services/UserToken";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: "5%",
    padding: theme.spacing(2),
    textAlign: "left",
    border: "1px solid #E3EBF6",
    boxSizing: "border-box",
    borderRadius: "10px",
  },
}));
export default function BorrowerList(props) {
  const classes = useStyles();


  return (
    <>
     <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#FF0000"} name={"Total Number Of Loans Requested"} number={getLoansNo()}/>
        </Grid>
        <Grid item xs>
        {/* <Cards color={"#007945"} name={"Total Amount Of Loans Requested"} number={"40,000"}/> */}
        </Grid>
    </Grid>
    <p className="dashboardtitle"> Borrowers List</p>
     <Paper className={classes.paper}>
          <LoanTable url="/loans?paginate=NOONE" action={false} style={{padding: "1px"}}/>
      </Paper>
     <Paper className={classes.paper}>
          <BorrowerListCharts style={{padding: "1px"}}/>
      </Paper>
     
    </>
  );
}
