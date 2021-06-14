import React, { Component, useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Api from "../Services/Api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import {setUserDetails, setToken} from "../Services/UserToken";
import "./otp.css";
import {
  Typography,
  TextField,
  makeStyles,
  Grid,
  Button,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Otp() {
    const api = Api();
    const history = useHistory();

  const [otp, setState] = useState({
    otp: "",
    message: "",
    showmessage: false,
    loading: false,
  });
  // let history = useHistory();

  //   const [showmessage, setshowmessage] = useState(false);
  //   const [loading, setloading] = useState(false);
  const clearOtp = () => {
    setState({...otp, otp: "" });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(otp.otp);
    console.log(otp.otp);
    setState({...otp, loading: true})
    api
      .post("/verify_token/admin/login", {
          token: otp.otp})
      .then(function (response) {
        console.log(response);
        // setloading(false)
        setUserDetails(response.data.data)
        setToken(response.data.data.token)
        setState({...otp, loading: false });
        return history.push("/dashboard");
        // nextFnc(otp.otp, 1)
      })
      .catch(function (error) {
        console.log(error);

        // {error.message != null &&
        //     setState({...otp, message: error.response.data.data.response_message});
        // }
        console.log(otp.message);
        // setshowmessage(true)
        setState({...otp, showmessage: true });
        // setloading(false)
        setState({...otp, loading: false });
        // setshowmessage(false)
        setState({...otp, showmessage: false });
      });
  };

  const handleChange = (otp) => {
    setState({...otp, otp: otp})
    console.log(otp.otp);
  };

//   render() {
    return (
      <div>
        {otp.showmessage && <ErrorAlert message={otp.message} />}
        <form onSubmit={handleSubmit}>
          <OtpInput
            inputStyle="inputStyle"
            value={otp.otp}
            onChange={handleChange}
            numInputs={6}
            separator={<span>-</span>}
            isInputNum={true}
            isInputSecure={true}
          />
          <br></br>
          {/* <div className="btn-row"> */}
          <Button
            // className={classes.button}
            onClick={clearOtp}
            variant="contained"
            color="secondary"
            className="buttontokenreset"
          >
            Reset
          </Button>

          <Button
            //   component={Link}
            //   to="/reset-password"
            disabled={otp.otp.length < 6}
            className="buttontoken"
            variant="contained"
            type="submit"
          >
            Verify Token
          </Button>
        </form>
      </div>
    );
//   }
}
