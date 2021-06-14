import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LoanTable from "../Component/LoansTable";
import LogsTable from "../Component/LogsTable";

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
export default function AdminLogs(props) {
  const classes = useStyles();

  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        
    </Grid>
    <p className="dashboardtitle"> Admin Logs </p>
     <Paper className={classes.paper}>
        <LogsTable url="/admin_logs?paginate=jjjkj" action={false} style={{padding: "1px"}}/>
      </Paper>
    
    </>
  );
}
