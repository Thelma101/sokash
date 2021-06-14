import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import { Formik, Form } from "formik";
import * as yup from "yup";
import Api from "../Services/Api";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../Pages/ErrorAlert";

export default function CreateRoles() {
  const [open, setOpen] = React.useState(true);

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
    name: yup.string().required("This field is required."),
    description: yup.string().required("This field is required."),
    

  });
 const api = Api();

  return (
    <div>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       
      <Formik
        initialValues={{
          name: "",
          description: "",
          
        }}
        validationSchema={validateSchema}
        onSubmit={(values, { setErrors }) => {
          setloading(true)
          console.log(values)
          api.post('/roles', values)
          .then(function (response) {
            console.log(response);
            setloading(false)
            setOpen(false)
            window.location.reload(false)
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
         <div>
              <form onSubmit={handleSubmit}>
              {showmessage && <ErrorAlert message={message} />}
        <DialogTitle id="form-dialog-title">Create Roles</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role Name"
            type="test"
            error={errors.name && touched.name}
            autoComplete="name"
            name="name"
            autoFocus
            helperText={
              errors.name && touched.name ? errors.name : null
            }
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="test"
            error={errors.description && touched.description}
            autoComplete="name"
            name="description"
            autoFocus
            helperText={
              errors.description && touched.description ? errors.description : null
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
                <Button  variant="contained">
                  {"Loading ... "}
                </Button>
              ) : (
                <Button
                  // component={Link}
                  // to="/account/dashboard"
                //   className={classes.button}
                  variant="contained"
                  type="submit"
                >
                 Create Roles
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
