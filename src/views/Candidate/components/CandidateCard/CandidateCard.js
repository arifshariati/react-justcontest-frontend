import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";

//Icons
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

// MUI
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Grid,
  Divider,
  Button,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";

// Redux
import { connect } from "react-redux";

import {
  deleteCandidate,
  uploadCandidatePicture,
} from "../../../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {},

  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  avatar: {
    width: "90%",
    height: "90%",
  },
}));

const CandidateCard = (props) => {
  const {
    className,
    candidateData,
    deleteCandidate,
    uploadCandidatePicture,
    ...rest
  } = props;

  //console.log(candidateData);

  const classes = useStyles();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);

    props.uploadCandidatePicture(formData, candidateData.candidateId);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById(candidateData.candidateId);
    fileInput.click();
  };

  const handleDeleteCandidate = (event) => {
    props.deleteCandidate(candidateData.candidateId);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title={candidateData.name}
        subheader={moment(candidateData.createdAt).fromNow()}
      />
      <CardMedia
        className={classes.media}
        image={candidateData.picture}
        title={candidateData.name}
      />

      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Tooltip title="Upload Candidate Picture">
              <Button
                className={classes.uploadButton}
                onClick={handleEditPicture}
                color="primary"
                variant="text"
              >
                <PublishIcon color="primary" fontSize="default" />
              </Button>
            </Tooltip>
            <input
              type="file"
              id={candidateData.candidateId}
              hidden="hidden"
              onChange={handleImageChange}
            />
          </Grid>
          <Grid className={classes.statsItem} item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <IconButton aria-label="add to favorites" disabled={true}>
                  {candidateData.voteCount === 0 ? (
                    <ThumbUpOutlinedIcon color="primary" fontSize="small" />
                  ) : (
                    <ThumbUpIcon color="primary" fontSize="small" />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body" color="primary" align="left">
                  {candidateData.voteCount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {candidateData.candidateAddedToContests === 0 ? (
            <Grid className={classes.statsItem} item>
              <Tooltip title="Delete Candidate">
                <Button
                  className={classes.uploadButton}
                  onClick={handleDeleteCandidate}
                  variant="outline"
                >
                  <DeleteIcon color="secondary" fontSize="default" />
                </Button>
              </Tooltip>
            </Grid>
          ) : (
            <Grid className={classes.statsItem} item>
              <Tooltip title="Candidate is Active in Contest(s)">
                <div>
                  <Button
                    className={classes.uploadButton}
                    variant="outline"
                    disabled={true}
                  >
                    <DeleteIcon color="default" fontSize="default" />
                  </Button>
                </div>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

CandidateCard.propTypes = {
  className: PropTypes.string,
  candidateData: PropTypes.object,
  deleteCandidate: PropTypes.func,
  uploadCandidatePicturee: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionsToProps = {
  deleteCandidate,
  uploadCandidatePicture,
};
export default connect(mapStateToProps, mapActionsToProps)(CandidateCard);
