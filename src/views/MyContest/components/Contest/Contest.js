import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Tooltip, Button, CardContent } from "@material-ui/core";

import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

//Icons
// Icons
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

// components

import {
  Candidate,
  ProgressBar,
  AddCandidateToContest,
  MyCandidates,
} from "./components";
import { connect } from "react-redux";

import {
  deleteContest,
  AddContestNewCandidate,
  deleteContestCandidate,
} from "../../../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
    //maxWidth: 345,
    minWidth: 345,
    padding: theme.spacing(1, 0),
    /* height: "100%", */
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red[500]",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Contest = (props) => {
  const classes = useStyles();

  const {
    contestData,
    candidates,
    data: { contestCandidates },
    userId,
  } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  /* const handleExpandClick = () => {
    setExpanded(!expanded);
  }; */

  const handleAddCandidateToContest = (candidateId) => (event) => {
    event.preventDefault();
    props.AddContestNewCandidate({
      userId,
      contestId: contestData.contestId,
      candidateId,
    });
    //close dialog
    handleDialogClose();
  };

  const handleDeleteContest = () => {
    const deleteContestData = {
      contestId: contestData.contestId,
      userId,
    };
    props.deleteContest(deleteContestData);
  };

  const handleDeleteContestCandidate = (candidateId) => (event) => {
    event.preventDefault();
    props.deleteContestCandidate({
      candidateId: candidateId,
      contestId: contestData.contestId,
    });
  };

  return (
    <div className={classes.root}>
      <Card>
        <Grid container spacing={0}>
          <Grid item xl={12} lg={12} sm={12} xs={12}>
            <CardHeader
              title={contestData.title}
              subheader={moment(contestData.createdAt).fromNow()}
              style={{ paddingBottom: "0.5rem" }}
            />
            <CardContent style={{ paddingTop: "0" }}>
              <Typography variant="body1" color="inherit">
                {contestData.description}
              </Typography>
            </CardContent>
          </Grid>

          <Grid item xl={12} lg={12} sm={12} xs={12}>
            <Grid container spacing={1} justify="center">
              {contestCandidates &&
                contestCandidates.map((candidate, index) =>
                  candidate.contestId === contestData.contestId ? (
                    <Grid item xl={6} lg={6} sm={6} xs={6} key={index}>
                      <Grid container spacing={1}>
                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                          <Candidate
                            candidate={candidate}
                            deleteContestCandidate={handleDeleteContestCandidate(
                              candidate.candidateId
                            )}
                          />
                        </Grid>

                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xl={4} lg={4} sm={4} xs={4}>
                              <Typography
                                variant="body2"
                                component="h1"
                                align="right"
                              >
                                Votes
                              </Typography>
                            </Grid>
                            <Grid item xl={8} lg={8} sm={8} xs={8}>
                              <ProgressBar
                                variant="determinate"
                                value={
                                  candidate.voteCount > 0
                                    ? Math.round(
                                        candidate.voteCount /
                                          contestData.voteCountTotal
                                      ) * 100
                                    : 0
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                )}
            </Grid>
          </Grid>

          {/* {contestData.userDetails && ( */}
          <Grid item xl={12} lg={12} sm={12} xs={12}>
            <CardActions>
              <Avatar
                aria-label="profileImage"
                src={contestData.picture}
                className={classes.avatar}
              >
                R
              </Avatar>

              <Typography variant="body2" component="h1" align="center">
                {contestData.name}
              </Typography>

              <IconButton aria-label="add to favorites" disabled={true}>
                {contestData.voteCountTotal === 0 ? (
                  <ThumbUpOutlinedIcon color="default" fontSize="default" />
                ) : (
                  <ThumbUpIcon color="default" fontSize="default" />
                )}
              </IconButton>
              <Typography variant="body1" align="left">
                {contestData.voteCountTotal}
              </Typography>

              <IconButton aria-label="Comments" disabled={true}>
                {contestData.commentCountTotal === 0 ? (
                  <ChatBubbleOutlineIcon color="default" fontSize="default" />
                ) : (
                  <ChatBubbleIcon color="default" fontSize="default" />
                )}
              </IconButton>
              <Typography variant="body1" align="left">
                {contestData.commentCountTotal}
              </Typography>
              {/* <IconButton aria-label="share">
                  <ShareIcon fontSize="small" />
                </IconButton> */}

              {contestData.voteCountTotal === 0 &&
                contestData.commentCountTotal === 0 && (
                  <Tooltip title="Delete Candidate">
                    <Button
                      className={classes.uploadButton}
                      onClick={handleDeleteContest}
                      variant="outline"
                    >
                      <DeleteIcon color="secondary" fontSize="default" />
                    </Button>
                  </Tooltip>
                )}

              <Tooltip title="Add Candidate to Contest">
                <Button onClick={handleDialogOpen} variant="outline">
                  <AddCircleIcon color="primary" />
                </Button>
              </Tooltip>
              <AddCandidateToContest
                isOpen={isOpen}
                handleClose={handleDialogClose}
                title="Add Candidate To Contest"
              >
                {candidates &&
                  candidates
                    .filter((candidate) =>
                      contestData.candidates
                        ? candidate.userId === userId &&
                          !contestData.candidates.includes(
                            candidate.candidateId
                          )
                        : candidate.userId === userId
                    )

                    .map((candidate, index) => (
                      <MyCandidates
                        candidate={candidate}
                        key={index}
                        AddCandidateToContest={handleAddCandidateToContest(
                          candidate.candidateId
                        )}
                      />
                    ))}
              </AddCandidateToContest>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

Contest.propTypes = {
  classes: PropTypes.object.isRequired,
  contestData: PropTypes.object.isRequired,
  deleteContest: PropTypes.func,
  AddContestNewCandidate: PropTypes.func,
  deleteContestCandidate: PropTypes.func,
  user: PropTypes.object.isRequired,
  data: PropTypes.object,
  candidates: PropTypes.array,
  userId: PropTypes.string,
};

const mapActionsToProps = {
  deleteContest,
  AddContestNewCandidate,
  deleteContestCandidate,
};
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});
export default connect(mapStateToProps, mapActionsToProps)(Contest);
