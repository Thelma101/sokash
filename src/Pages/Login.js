import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Api from "../Services/Api";
import {useHistory} from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import {
  Typography,
  TextField,
  makeStyles,
  Grid,
  Button,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import logo from "../Component/logo-main.png";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      textAlign: "center",
    },
  },
  cont: {
    textAlign: "center",
    marginTop: 90,
  },
  button: {
    height: "28px",
    width: "71px",
    border: "1px solid #007945",
    borderRadius: "50px",
    minWidth: "60%",
    margin: 30,
    color: "#ffffff",
    backgroundColor: "#007945",
    "&:hover": {
      color: "#007945",
      backgroundColor: "#ffffff",
    },
  },
  buttonGoogle: {
    height: "28px",
    width: "21px",
    borderRadius: "50px",
    border: "1px solid #FFC107",
    minWidth: "60%",
    margin: 10,
    color: "#171D33",
    backgroundColor: "#E5E5E5",
    fontSize: "1vh",
    "&:hover": {
      color: "#171D33",
      backgroundColor: "#ffffff",
    },
  },
  textField: {
    color: "#007945",
  },
}));
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [message, setmessage] = useState("jkjkdkjkdj");
  const [showmessage, setshowmessage] = useState(false);
  const [loading, setloading] = useState(false);

  let validateSchema = yup.object().shape({
    email: yup.string().email().required("This field is required."),
    password: yup.string().required("This field is required."),
  });
 const api = Api();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.cont} maxWidth="sm">
              <img
                className="App"
                src={logo}
                style={{ margin: 40 }}
                height="30%"
                width="30%"
              ></img>
              <Typography variant="h6" gutterBottom>
                Welcome back!
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sign in to your dashboard
              </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validateSchema}
        onSubmit={(values, { setErrors }) => {
          setloading(true)
          console.log(values)
          api.post('/admin/login', values)
          .then(function (response) {
            console.log(response);
            setloading(false)
            return  history.push("/dashboard");            
            //  return history.push("/verify-token-login")              
            // nextFnc(values, 1)
          })
          .catch(function (error) {
            console.log(error);
            {error.response != null && setmessage(error.response.data.data)}
            console.log(message)
            setshowmessage(true)
            setloading(false)
            setshowmessage(false)
          });
        }}
        
      >
        {({ values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting, }) => (
         
           <form onSubmit={handleSubmit}  className={classes.root}>
              {showmessage && <ErrorAlert message={message} />}
              <Grid container spacing={3} style={{ padding: 50 }}>
                <Grid item xs={12}>
                  <CssTextField
                    className={classes.textField}
                    id="standard-basic"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">+234</InputAdornment>
                    //   ),
                    // }}
                    placeholder="Email/Staff Id"
                    type="email"
                    error={errors.email && touched.email}
                    autoComplete="email"
                    name="email"
                    autoFocus
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    className={classes.textField}
                    id="standard-basic"
                    placeholder="Password"
                    type="password"
                    error={errors.password && touched.password}
                    autoComplete="password"
                    name="password"
                    autoFocus
                    helperText={
                      errors.password && touched.password ? errors.password : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <Typography
                    component={Link}
                    to="/send-reset-otp"
                    variant="body2"
                    gutterBottom
                    style={{
                      textAlign: "left",
                      marginLeft: "50%",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Reset Password
                  </Typography>
                </Grid>
              </Grid>

              {loading ? (
                <Button className={classes.button} variant="contained">
                  {"Loading ... "}
                </Button>
              ) : (
                <Button
                  // component={Link}
                  // to="/account/dashboard"
                  className={classes.button}
                  variant="contained"
                  type="submit"
                >
                  Sign in
                </Button>
              )}
          </form>
        )}
      </Formik>
      </Container>
    </React.Fragment>
  );
}
