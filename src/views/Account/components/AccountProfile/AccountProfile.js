import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";

//MUI
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import Tooltip from "@material-ui/core/Tooltip";
// Redux
import { connect } from "react-redux";
import { uploadImage } from "../../../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 110,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountProfile = (props) => {
  const {
    className,
    user: {
      userDetails: { name, profileImage, createdAt },
    },
    ...rest
  } = props;

  const classes = useStyles();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  /* const user = {
    name: "Shen Zhi",
    city: "Los Angeles",
    country: "USA",
    timezone: "GTM-7",
    avatar: "/images/avatars/avatar_11.png",
  }; */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {name}
            </Typography>
            {/* <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography> */}
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment(createdAt).format("MMM YYYY")}{" "}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body2"
            >
              {moment(createdAt).fromNow()}
              {/* ({user.timezone}) */}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={profileImage} />
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <Tooltip title="Upload Profit Picture">
          <Button
            className={classes.uploadButton}
            onClick={handleEditPicture}
            color="primary"
            variant="text"
          >
            <PublishIcon color="primary" />
          </Button>
        </Tooltip>
        {/* <Button variant="text">Remove picture</Button> */}
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(AccountProfile);
