
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import  logo from './logo-main.png';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Headers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img src={logo} height="50px" width="150px"></img> 
          
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right', fontSize: 25}}>
         <NotificationsIcon style={{ fontSize: 30}} />
         <AccountCircleIcon style={{ fontSize: 30}}  />
         {/* <span >Odejinmi Tobiloba</span>  */}
         <ArrowDropDownIcon style={{ fontSize: 30}}  />
        </Grid>
      </Grid>
    </div>
  );
}

