import React, { useEffect, useState } from "react";
import Cards from "../Component/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Charts from "../Component/Dashboard/Chart";
import Api from "../Services/Api";
import {getAdminAnaysis} from "../Services/UserToken"
import {
  setAdminAnalysis,
  getEmployeeNo,
  getLoansNo,
} from "../Services/UserToken";

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

// ​/all-system-analysis
export default function Dashboard() {

  const classes = useStyles();
  const [analysis, setAnalysis] = useState({});
  const [loading, setloading] = useState(false)

  const getAnaysis = () => {
    setloading(true)
    Api()
      .get("/all-system-analysis")
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setAnalysis(response.data.data);
        setAdminAnalysis(response.data.data);
        setloading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setloading(false)
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    getAnaysis();
  }, []);

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      {/* total_amount_approved: 0
total_amount_defaulters: 66347.5
total_amount_of_transaction: 347104
total_amount_payback: 269310
total_amount_rejected: 0
total_amount_requested: 463531.5
total_no_of_enquiry: 10
total_no_of_loans: 7
total_no_of_repayment: 12
total_no_of_role: 4
total_no_of_transactions: 99
total_number_of_employee: 11
total_number_of_messages: 1
total_user: 72
total_user_requested: 2
total_verified_users: 26 */}
      <p className="dashboardtitle"> Dashboard</p>
      {!loading ? 
      <Grid container spacing={3}>
        <Grid item xs>
          <Cards
            color={"#007945"}
            name={"Total Users"}
            number={getAdminAnaysis() ? getAdminAnaysis().total_user : 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#007970"}
            name={"Total Verified Users"}
            number={getAdminAnaysis() ? getAdminAnaysis().total_verified_users : 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#100009"}
            name={"Total User Requested"}
            number={getAdminAnaysis() ? getAdminAnaysis().total_user_requested : 0}
          />
        </Grid>
        <Grid item xs>
        <Cards
            color={"#009999"}
            name={"Total Number Of Loans"}
            number={getLoansNo() ? getAdminAnaysis().total_user_requested: 0}
          />
          </Grid>
        <Grid item xs>
          <Cards
            color={"#000B71"}
            name={"Total Amount Approved"}
            number={formatter.format(getAdminAnaysis()?getAdminAnaysis().total_amount_approved : 0.0)}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#FF0000"}
            name={"Total Amount Default"}
            number={formatter.format(getAdminAnaysis()?getAdminAnaysis().total_amount_defaulters: 0.0)}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#000F00"}
            name={"Total Amount Disbursed"}
            number={formatter.format(getAdminAnaysis()? getAdminAnaysis().total_amount_disbursed: 0.0)}
          />
        </Grid>
        {/* total_amount_disbursed */}
        <Grid item xs>
          <Cards
            color={"#71DB21"}
            name={"Total Amount Payback"}
            number={formatter.format(getAdminAnaysis()?getAdminAnaysis().total_amount_payback: 0.0)}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#FF0060"}
            name={"Total Amount Rejected"}
            number={formatter.format(getAdminAnaysis()?getAdminAnaysis().total_amount_rejected:0.0)}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#290009"}
            name={"Total Amount Requested"}
            number={formatter.format(getAdminAnaysis()? getAdminAnaysis().total_amount_requested: 0.0)}
          />
        </Grid>

        {/* total_user_requested */}
        <Grid item xs>
          <Cards color={"#2F80ED"} name={"Messages"} number={"5"} />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#FFD300"}
            name={"Number Employees"}
            number={getAdminAnaysis()? getAdminAnaysis().total_number_of_employee: 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#000060"}
            name={"Number of Messages"}
            number={getAdminAnaysis()? getAdminAnaysis().total_number_of_messages: 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#099060"}
            name={"Number of Roles"}
            number={getAdminAnaysis()? getAdminAnaysis().total_no_of_role: 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#999090"}
            name={"Number of Transactions"}
            number={getAdminAnaysis()?getAdminAnaysis().total_no_of_transactions: 0}
          />
        </Grid>
        <Grid item xs>
          <Cards
            color={"#000090"}
            name={"Number of Enquiry"}
            number={getAdminAnaysis()? getAdminAnaysis().total_no_of_enquiry : 0}
          />
        </Grid>
      </Grid>
      : "Loading..." }
      {/* total_no_of_enquiry */}
      <Paper className={classes.paper}>
        <Charts style={{ padding: "5px" }} />
      </Paper>
    </>
  );
}
