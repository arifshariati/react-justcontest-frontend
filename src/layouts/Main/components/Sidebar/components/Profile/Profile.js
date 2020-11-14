import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";

import PulseSpinner from '../../../../../../components/PulseSpinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const {
    className,
    user: {
      userDetails: { profileImage, name },
    },
    UI: {loading},
    ...rest
  } = props;

  const classes = useStyles();

  return (
    
    <div {...rest} className={clsx(classes.root, className)}>
      {
        loading ? (<PulseSpinner />) : (
          <Fragment>
            <Avatar
              alt="Person"
              className={classes.avatar}
              component={RouterLink}
              src={profileImage}
              to="/account"
            />
            <Typography className={classes.name} variant="h4">
              {name}
            </Typography>
          </Fragment>
        )
      }
      
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps)(Profile);
