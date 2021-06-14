import React, {useEffect, useState} from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BorrowerListCharts from "../Component/BorrowerList/BorrowerChart";
import LoanTable from "../Component/LoansTable";
import {getLoansNo} from "../Services/UserToken";
import LoanProductTable from "../Component/LoanProductTable";
// import { Button } from "bootstrap";
import Button from '@material-ui/core/Button';
import CreateLoanProduct from "../Component/CreateLoanProdcut";

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
export default function LoanProduct(props)  {
  const classes = useStyles();
  const [creatloanpro, setcreateloanpro] =  useState(false)

  return (
    <>
     <Grid container spacing={3}>
        <Grid item xs>
          <Cards color={"#FF0000"} name={"Total Number Of Loans Product"} number={getLoansNo()}/>
        </Grid>
        <Grid item xs>
        <Button onClick={() => setcreateloanpro(true)} variant="contained" color="primary">
        Create Loan Product
      </Button>
        </Grid>
        
    </Grid>
    <p className="dashboardtitle"> Loan Product</p>
     <Paper className={classes.paper}>
          <LoanProductTable url="/loan_products?paginate=NOONE" action={false} style={{padding: "1px"}}/>
      </Paper> 
      {creatloanpro && <CreateLoanProduct />  }
    </>
  );
}
