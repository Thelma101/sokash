import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EmployeeTable from "../Component/EmployeeTable";
import { Button } from "@material-ui/core";
import {getUsersNo} from "../Services/UserToken"
import UserTable from "../Component/UserTable"

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
export default function UserList(props) {
  const classes = useStyles();

  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#AA6535"} name={"Users"} number={getUsersNo()}/>
        </Grid>
        {/* <Grid item xs>
           <Button>Ceate Employee</Button>
        </Grid> */}
    </Grid>
    <p className="dashboardtitle"> Users </p>
     <Paper className={classes.paper}>
          <UserTable url="/users?paginate=jjjskl" action={true} buttontext="Lock User" style={{padding: "1px"}}/>
      </Paper>
    
    </>
  );
}
