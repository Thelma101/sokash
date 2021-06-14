import React from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import RolesTable from "../Component/RoleTable";
import CreateRoles from "../Component/CreateRoles";
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
export default function UserLogs(props) {
  const classes = useStyles();
 const [createroles, setcreateroles] = React.useState(false)
  return (
    <>
    <br></br>
    <Grid container spacing={3}>
    <Button onClick={() => setcreateroles(true)} variant="contained" color="primary">
        Create Roles
      </Button>
    </Grid>
    <p className="dashboardtitle">Roles </p>
     <Paper className={classes.paper}>
        <RolesTable url="/roles?paginate=jjjkj" action={false} style={{padding: "1px"}}/>
      </Paper>
      {createroles && <CreateRoles />  }
    </>
  );
}
