import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  greyBackground: {
    padding: theme.spacing(12),
    minHeight: "30vh",
    backgroundColor: theme.palette.background.default,
  },
  whiteBackground: {
    padding: theme.spacing(12),
    minHeight: "30vh",
    backgroundColor: theme.palette.white,
  },
}));

const LandingPage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Hi</h1>
    </div>
  );
};

export default LandingPage;
