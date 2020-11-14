import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

//MUI
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";

// Redux
import { connect } from "react-redux";
import { edituserdetails } from "../../../../redux/actions/userActions";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const {
    className,
    user: {
      userDetails
    },
    ...rest
  } = props;

  //console.log(userDetails);

  const classes = useStyles();

  const [values, setValues] = useState({
    name:userDetails.name,
    email:userDetails.email,
    phone:userDetails.phone,
  });

  //console.log(values);

  const handleChange = (event) => {
    
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const userDetails = {
      name: values.name,
      phone: values.phone,
    };

    //console.log(userDetails);

    props.edituserdetails(userDetails);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Name"
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled="disabled"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Tooltip title="Save Details">
            <Button color="primary" onClick={handleSubmit} variant="outline">
              <SaveIcon color="primary" />
            </Button>
          </Tooltip>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  edituserdetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  edituserdetails,
};

export default connect(mapStateToProps, mapActionsToProps)(AccountDetails);
