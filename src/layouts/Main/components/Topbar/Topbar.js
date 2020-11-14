import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
//Redux
import { connect } from "react-redux";
import { signOut } from "../../../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
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
  handleSignOut = () => {
    this.props.signOut();
  };
  handleSignIn = () => {
    window.location.href = "/sign-in";
  };
  render() {
    const {
      classes,
      user:{ authenticated},
      notifications,
      className,
      onSidebarOpen,
      ...rest
    } = this.props;

    return (
      <AppBar
        {...rest}
        color="primary"
        className={clsx(classes.root, className)}
      >
        <Toolbar>
          <RouterLink to="/dashboard">
            <Typography
              variant="h2"
              component="h1"
              align="left"
              className={classes.logoText}
            >
              just contests
            </Typography>
          </RouterLink>
          <div className={classes.flexGrow} />
          <Hidden mdDown>
            {/* <IconButton color="inherit">
               <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge> 
            </IconButton> */}
            {authenticated ? (
              <Tooltip title="Sign Out">
              <IconButton
                className={classes.signOutButton}
                onClick={() => {
                  this.handleSignOut();
                }}
                color="inherit"
              >
                <InputIcon />
              </IconButton>
            </Tooltip>
            ) : (
              <Tooltip title="Sign In">
              <IconButton
                className={classes.signOutButton}
                onClick={() => {
                  this.handleSignIn();
                }}
                
                color="inherit"
              >
                <SettingsPowerIcon />
              </IconButton>
            </Tooltip>
            )}
            

          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Topbar.propTypes = {
  classes: PropTypes.object,
  user:PropTypes.object.isRequired,
  notifications: PropTypes.object,
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  singOut: PropTypes.func
};

const mapStateToProps = (state) => ({
  user:state.user
});
const mapActionsToProps = {
  signOut
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Topbar));
