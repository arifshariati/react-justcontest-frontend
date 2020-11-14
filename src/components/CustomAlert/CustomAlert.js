import React from "react";
//mui
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomAlert({ msg, type }) {
  return <Alert severity={type}>{msg}</Alert>;
}

export default CustomAlert;
