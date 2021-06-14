import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EmployeeTable from "../Component/EmployeeTable";
import { Button } from "@material-ui/core";
import {getEmployeeNo} from "../Services/UserToken"
import CreateEmployee from "../Component/CreateeEmployee";

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
export default function Employee(props) {
  const classes = useStyles();
 const [createemployee, setcreateemployee] = React.useState(false)
  return (
    <>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#FFD300"} name={"Employees"} number={getEmployeeNo()}/>
        </Grid>
        <Grid item xs>
           <Button onClick={() => setcreateemployee(true)} variant="contained" color="primary">
           Ceate Employee
      </Button>
        </Grid>
    </Grid>
    <p className="dashboardtitle"> Employees </p>
     <Paper className={classes.paper}>
          <EmployeeTable url="/admins?painate=jjjk" action={true} buttontext="Lock Admin" style={{padding: "1px"}}/>
      </Paper>
    {createemployee && <CreateEmployee />}
    </>
  );
}
