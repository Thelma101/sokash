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

export default function CreateLoanProduct() {
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
    min_amount: yup.number().required("This field is required."),
    max_amount: yup.number().required("This field is required."),
    penalty: yup.string().required("This field is required."),
    tenure_type: yup.string().required("This field is required."),
    min_credit_score: yup.number().required("This field is required."),
    min_kyc_level: yup.number().required("This field is required."),
    process_fees: yup.string().required("This field is required."),
    system_can_approved: yup.number().required("This field is required."),
    max_tenure: yup.number().required("This field is required."),
    interest_rate: yup.number().required("This field is required."),
    interest_rate_type: yup.string().required("This field is required."),
    loan_type: yup.string().required("This field is required."),


  });
 const api = Api();

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       
         <Formik
        initialValues={{
          name: "",
          min_amount: 0,
          max_amount: 0,
          penalty: "0",
          tenure_type: "",
          min_credit_score: 0,
          min_kyc_level:0,
          process_fees: "0",
          system_can_approved: 0,
          max_tenure: 0,
          interest_rate: 0,
          interest_rate_type: "",
          loan_type:"",
        }}
        validationSchema={validateSchema}
        onSubmit={(values, { setErrors }) => {
          setloading(true)
          console.log(values)
          api.post('/loan_products', values)
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
              <DialogTitle id="form-dialog-title">Create Loan Prodcut</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
        
          
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Prodcut Name"
            type="text"
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
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="minamount"
            label="Min Amount"
            type="number"
             error={errors.min_amount && touched.min_amount}
                    autoComplete="min_amount"
                    name="min_amount"
                    autoFocus
                    helperText={
                      errors.min_amount && touched.min_amount ? errors.min_amount : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="maxamount"
            label="Max Amount"
            type="number"
             error={errors.max_amount && touched.max_amount}
                    autoComplete="max_amount"
                    name="max_amount"
                    autoFocus
                    helperText={
                      errors.max_amount && touched.max_amount ? errors.max_amount : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="penalty"
            label="Penalty"
            type="text"
             error={errors.penalty && touched.penalty}
                    autoComplete="penalty"
                    name="penalty"
                    autoFocus
                    helperText={
                      errors.penalty && touched.penalty ? errors.penalty : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
          
       <br></br>
        <Select
          label="Tenure Type"
          value={values.tenure_type}
        //   onChange={handleChange}
          displayEmpty
        //   className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
          error={errors.tenure_type && touched.tenure_type}
          autoComplete="tenure_type"
          name="tenure_type"
          autoFocus
          helperText={
            errors.tenure_type && touched.tenure_type ? errors.tenure_type : null
          }
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        >
          <MenuItem value="" disabled>
            Placeholder
          </MenuItem>
          <MenuItem value="days">Days</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
        <FormHelperText>Teniure Type</FormHelperText>
      
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="mincreditscore"
            label="Min Credit Score"
            type="number"
             error={errors.min_credit_score && touched.min_credit_score}
                    autoComplete="min_credit_score"
                    name="min_credit_score"
                    autoFocus
                    helperText={
                      errors.min_credit_score && touched.min_credit_score ? errors.min_credit_score : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="minkyclevel"
            label="Min Kyc Level"
            type="number"
             error={errors.min_kyc_level && touched.min_kyc_level}
                    autoComplete="min_kyc_level"
                    name="min_kyc_level"
                    autoFocus
                    helperText={
                      errors.min_kyc_level && touched.min_kyc_level ? errors.min_kyc_level : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="processfees"
            label="Process Fees"
            type="text"
             error={errors.process_fees && touched.process_fees}
                    autoComplete="process_fees"
                    name="process_fees"
                    autoFocus
                    helperText={
                      errors.process_fees && touched.process_fees ? errors.process_fees : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
         <br></br>
          <Select
          label="Systerm Can Approve"
          value={values.system_can_approved}
        //   onChange={handleChange}
          displayEmpty
        //   className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
          error={errors.system_can_approved && touched.system_can_approved}
          autoComplete="system_can_approved"
          name="system_can_approved"
          autoFocus
          helperText={
            errors.system_can_approved && touched.system_can_approved ? errors.system_can_approved : null
          }
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        >
          <MenuItem value="" disabled>
            Placeholder
          </MenuItem>
          <MenuItem value={0}>No</MenuItem>
          <MenuItem value={1}>Yes</MenuItem>
        </Select>
        <FormHelperText>Systerm Can Approve</FormHelperText>

        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="maxtenure"
            label="Max Tenure"
            type="number"
             error={errors.max_tenure && touched.max_tenure}
                    autoComplete="max_tenure"
                    name="max_tenure"
                    autoFocus
                    helperText={
                      errors.max_tenure && touched.max_tenure ? errors.max_tenure : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
        <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="interestrate"
            label="Interest Rate %"
            type="number"
             error={errors.interest_rate && touched.interest_rate}
                    autoComplete="interest_rate"
                    name="interest_rate"
                    autoFocus
                    helperText={
                      errors.interest_rate && touched.interest_rate ? errors.interest_rate : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
            fullWidth
          />
         <br></br>
          <Select
          label="Interest Rate Type"
          value={values.interest_rate_type}
        //   onChange={handleChange}
          displayEmpty
        //   className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
          error={errors.interest_rate_type && touched.interest_rate_type}
          autoComplete="interest_rate_type"
          name="interest_rate_type"
          autoFocus
          helperText={
            errors.interest_rate_type && touched.interest_rate_type ? errors.interest_rate_type : null
          }
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        >
          <MenuItem value="" disabled>
            Interest Rate Type
          </MenuItem>
          <MenuItem value="days">Days</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
        <FormHelperText>Interest Rate Type</FormHelperText>

        <br></br>
         <Select
          label="Loan Type"
          value={values.loan_type}
        //   onChange={handleChange}
          displayEmpty
        //   className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
          error={errors.loan_type && touched.loan_type}
          autoComplete="loan_type"
          name="loan_type"
          autoFocus
          helperText={
            errors.loan_type && touched.loan_type ? errors.loan_type : null
          }
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        >
          <MenuItem value="" disabled>
          Loan Type
          </MenuItem>
          <MenuItem value="personal">Personal</MenuItem>
          <MenuItem value="bussiness">Bussiness</MenuItem>
        </Select>
        <FormHelperText>Loan Type</FormHelperText>
       
      
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
                 Create Loan Product
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
