import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography} from "@material-ui/core";




const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  logo: {
    color: theme.palette.white,
  },
  logoText: {
    color: theme.palette.white,
    fontWeight: "bold",
  },
}));

const Topbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography
            variant="h2"
            component="h1"
            align="left"
            className={classes.logoText}
          >
            just contests
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
