import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Api from "../Services/Api";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../Pages/ErrorAlert";
import { Button } from "@material-ui/core";
import {getUserDetails} from "../Services/UserToken";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      padding: 10,
    //   width: "25ch",
    },
    
  },
  button: {
    height: "28px",
    width: "71px",
    border: "1px solid #007945",
    borderRadius: "50px",
    minWidth: "60%",
    marginTop: 25,
    color: "#ffffff",
    backgroundColor: "#007945",
    "&:hover": {
      color: "#007945",
      backgroundColor: "#ffffff",
    },
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const history = useHistory();
  const [message, setmessage] = React.useState("jkjkdkjkdj");
  const [showmessage, setshowmessage] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  let validateSchema = yup.object().shape({
    old_password: yup.string().required("This field is required."),
    new_password: yup.string().required("This field is required."),
    c_new_password: yup.string().required("This field is required."),
  });
 const api = Api();
  return (
      <div>
    <Formik
    initialValues={{
      old_password: "",
      new_password: "",
      c_new_password: "",
    }}
    validationSchema={validateSchema}
    onSubmit={(values, { setErrors }) => {
      setloading(true)
      console.log(values)
      api.post(`​/admin​/password​/reset​/${getUserDetails().admin_id}`, values)
      .then(function (response) {
        console.log(response);
        setloading(false)
        return history.push("/")
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
    {/* <form className={classes.root} noValidate autoComplete="off"> */}
      <TextField id="standard-basic" label="Old Password" 
       error={errors.old_password && touched.old_password}
       autoComplete="old_password"
       name="old_password"
       autoFocus
       helperText={
         errors.old_password && touched.old_password ? errors.old_password : null
       }
       onChange={handleChange}
       onBlur={handleBlur}
       fullWidth />
      <TextField id="standard-basic" label="New Password"
       error={errors.new_password && touched.new_password}
       autoComplete="new_password"
       name="new_password"
       autoFocus
       helperText={
         errors.new_password && touched.new_password ? errors.new_password : null
       }
       onChange={handleChange}
       onBlur={handleBlur}
        fullWidth />
      <TextField id="standard-basic" label="Comfirm New Password" 
       error={errors.c_new_password && touched.c_new_password}
       autoComplete="c_new_password"
       name="c_new_password"
       autoFocus
       helperText={
         errors.c_new_password && touched.c_new_password ? errors.c_new_password : null
       }
       onChange={handleChange}
       onBlur={handleBlur}
       fullWidth />
      
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
                 Change Password
                </Button>
              )}
    </form>
    )}
      </Formik>
      </div>
  );
}
