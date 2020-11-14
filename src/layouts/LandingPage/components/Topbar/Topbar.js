import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import clsx from "clsx";
import propTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

// Redux
import { connect } from "react-redux";

import { signIn } from "../../../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signInButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    color: theme.palette.white,
  },
  logoText: {
    color: theme.palette.white,
    fontWeight: "bold",
  },
});

class Topbar extends Component {
  /* handleSignIn = () => {
    //this.props.signIn();
    //this.props.history.push("/sign-in");
    this.props.history.push("/sign-in");
  }; */
  render() {
    const {
      classes,
      notifications,
      className,
      onSidebarOpen,
      ...rest
    } = this.props;

    return (
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <RouterLink to="/dashboard">
            {/* <FontAwesomeIcon
              icon={faChartLine}
              size="2x"
              className={classes.logo}
            /> */}
            <Typography
              variant="h2"
              component="h1"
              align="left"
              className={classes.logoText}
            >
              just contests
            </Typography>
          </RouterLink>
          {/* <Grid container spacing={4}>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Grid container justify="flex-end">
                <FontAwesomeIcon icon={faChartLine} size="2x" />
              </Grid>
            </Grid>
            <Grid item lg={8} sm={8} xl={8} xs={8}>
              <Grid container>
                <RouterLink to="/landingPage">
                  <Typography className={classes.logoText} variant="h2">
                    Investment Management
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Grid> */}
        </Toolbar>
      </AppBar>
    );
  }
}

Topbar.propTypes = {
  classes: propTypes.object,
  notifications: propTypes.object,
  className: propTypes.string,
  onSidebarOpen: propTypes.func,
  singIn: propTypes.func,
};

const mapStateToProps = (state) => ({
  client: state.client,
});
const mapActionsToProps = {
  signIn,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(Topbar)));
