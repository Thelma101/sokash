import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormHelperText, MenuItem, Select } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Api from "../Services/Api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../Pages/ErrorAlert";

export default function CreateEmployee() {
  const [open, setOpen] = React.useState(true);
  const [roles, setroles] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const [message, setmessage] = useState("jkjkdkjkdj");
  const [showmessage, setshowmessage] = useState(false);
  const [loading, setloading] = useState(false);

  let validateSchema = yup.object().shape({
    first_name: yup.string().required("This field is required."),
    last_name: yup.string().required("This field is required."),
    email: yup.string().email().required("This field is required."),
    phone_number: yup.string().min(11).max(11).required("This field is required."),
    department: yup.string().required("This field is required."),
    role_id: yup.number().required("This field is required."),
    password: yup.string().required("This field is required."),
    staff_id: yup.string().required("This field is required."),
  });
  const api = Api();

  const getLoanData = () => {
    setloading(true)
  Api()
    .get("/roles")
    .then(function (response) {
      // handle success
      console.log(response.data.data);
      setroles(response.data.data)
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
React.useEffect(() => {
 
  getLoanData();
}, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            department: "",
            role_id: 0,
            password: "",
            staff_id: "",
          }}
          validationSchema={validateSchema}
          onSubmit={(values, { setErrors }) => {
            setloading(true);
            console.log(values);
            api
              .post("/admins", values)
              .then(function (response) {
                console.log(response);
                setloading(false);
                return history.push("/verify-token-login");
                // nextFnc(values, 1)
              })
              .catch(function (error) {
                console.log(error);
                {
                  error.response != null &&
                    setmessage(error.response.data.data);
                }
                console.log(message);
                setshowmessage(true);
                setloading(false);
                setshowmessage(false);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                {showmessage && <ErrorAlert message={message} />}
                <DialogTitle id="form-dialog-title">Create Employee</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText> */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="fiestname"
                    label="First Name"
                    type="test"
                    error={errors.first_name && touched.first_name}
                    autoComplete="first_name"
                    name="first_name"
                    autoFocus
                    helperText={
                      errors.first_name && touched.first_name ? errors.first_name : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lastname"
                    label="Last Name"
                    type="test"
                    error={errors.last_name && touched.last_name}
                    autoComplete="last_name"
                    name="last_name"
                    autoFocus
                    helperText={
                      errors.last_name && touched.last_name ? errors.last_name : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
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
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone number"
                    label="Phone  umber"
                    type="test"
                    error={errors.phone_number && touched.phone_number}
                    autoComplete="phone_number"
                    name="phone_number"
                    autoFocus
                    helperText={
                      errors.phone_number && touched.phone_number ? errors.phone_number : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="test"
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
                  <TextField
                    autoFocus
                    margin="dense"
                    id="department"
                    label="Department"
                    type="test"
                    error={errors.department && touched.department}
                    autoComplete="department"
                    name="department"
                    autoFocus
                    helperText={
                      errors.department && touched.department ? errors.department : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />

                  <Select
                    label="Roles"
                    value={values.role_id}
                    //   onChange={handleChange}
                    displayEmpty
                    //   className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                    error={errors.role_id && touched.role_id}
                    autoComplete="role_id"
                    name="role_id"
                    autoFocus
                    helperText={
                      errors.role_id && touched.role_id ? errors.role_id : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Selct Roles
                    </MenuItem>
                    {roles.map((role, i) => (
                        <MenuItem value={role.id}>{role.name}</MenuItem>

                    )
                    )}
                  </Select>
                  <FormHelperText>Roles</FormHelperText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="staff_id"
                    label="Satff Id"
                    type="test"
                    error={errors.staff_id && touched.staff_id}
                    autoComplete="staff_id"
                    name="staff_id"
                    autoFocus
                    helperText={
                      errors.staff_id && touched.staff_id ? errors.staff_id : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}

                  {loading ? (
                    <Button variant="contained">{"Loading ... "}</Button>
                  ) : (
                    <Button
                      // component={Link}
                      // to="/account/dashboard"
                      //   className={classes.button}
                      variant="contained"
                      type="submit"
                    >
                      Create Employee
                    </Button>
                  )}
                </DialogActions>
              </form>
            </div>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
