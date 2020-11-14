import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Tooltip } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";




import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";


// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
// components

import { Candidate, ProgressBar, Comments } from "./components";
import { connect } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
    //maxWidth: 345,
    minWidth: 345,
    padding: theme.spacing(1, 1),
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
    data: { contests, contestCandidates, comments },
    UI: { loading }
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xl={5} lg={5} sm={12} xm={12}>
            <Grid container spacing={1}>
            
            { !loading ? contests &&
              contests.map((contest, index) => (
                <Grid item xl={12} lg={12} sm={12} xs={12} key={index}>
                  <Card>
                    <Grid container spacing={0}>
                      <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <CardHeader
                              title={contest.title}
                              subheader={moment(contest.createdAt).fromNow()}
                              style={{paddingBottom:"0.5rem"}}
                            />
                            <CardContent style={{paddingTop:"0"}}>
                              <Typography
                                color="inherit"
                                variant="body1"
                              >
                                {contest.description}
                              </Typography>
                            </CardContent>
                        
                      </Grid>

                      <Grid item xl={12} lg={12} sm={12} xs={12}>
                        <Grid container spacing={1} justify="center">
                          {contestCandidates &&
                            contestCandidates.map((candidate,index) =>
                              candidate.contestId === contest.contestId ? (
                                <Grid item xl={6} lg={6} sm={6} xs={6} key={index}>
                                  <Grid container spacing={1} justify="center">
                                    <Grid item xl={12} lg={12} sm={12} xs={12}>
                                      <Candidate
                                        candidate={candidate}
                                        contestId={contest.contestId}
                                      />
                                    </Grid>
                                    <Grid item xl={12} lg={12} sm={12} xs={12}>
                                      <Grid
                                        container
                                        spacing={1}
                                        justify="center"
                                      >
                                        <Grid item xl={2} lg={2} sm={3} xs={3}>
                                          <Typography
                                            variant="body2"
                                            component="h1"
                                            align="right"
                                          >
                                            Votes
                                          </Typography>
                                        </Grid>
                                        <Grid item xl={10} lg={10} sm={9} xs={9}>
                                          <ProgressBar
                                            value={
                                              candidate.voteCount > 0
                                                ? Math.round(
                                                    (candidate.voteCount /
                                                      contest.voteCountTotal) *
                                                      100
                                                  )
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

                      {/* {contest.userDetails && ( */}
                        <Grid item xl={12} lg={12} sm={12} xs={12}>
                          <CardActions>
                            <Grid
                              container
                              spacing={0}
                              justify="space-around"
                              alignItems="center"
                            >
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <Avatar
                                      aria-label="profileImage"
                                      src={contest.picture}
                                      className={classes.avatar}
                                    >
                                      R
                                    </Avatar>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="body2"
                                      component="h1"
                                      align="center"
                                    >
                                      {contest.name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <IconButton
                                      aria-label="add to favorites"
                                      disabled={true}
                                    >
                                      {
                                        contest.voteCountTotal === 0 ? (
                                          <ThumbUpOutlinedIcon color="default" fontSize="default" />
                                        ) : (
                                          <ThumbUpIcon color="default" fontSize="default" />
                                        )
                                      }
                                      
                                    </IconButton>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="body1"
                                      color="inherit"
                                      align="left"
                                    >
                                      {contest.voteCountTotal}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item>
                                    <IconButton
                                      aria-label="Comments"
                                      disabled={true}
                                    >
                                      {
                                        contest.commentCountTotal === 0 ? (
                                          <ChatBubbleOutlineIcon color="default" fontSize="default" />
                                        ) : (
                                          <ChatBubbleIcon color="default" fontSize="default" />
                                        )
                                      }
                                      
                                    </IconButton>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="body1"
                                      color="inherit"
                                      align="left"
                                    >
                                      {contest.commentCountTotal}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item>
                                <Tooltip title="Comment on Contest">
                                  <IconButton
                                    className={clsx(classes.expand, {
                                      [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    align="right"
                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </CardActions>

                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Comments
                                contestId={contest.contestId}
                                comments={comments}
                              />
                            </CardContent>
                          </Collapse>
                        </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )): ( <LoadingSpinner />)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Contest.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps)(Contest);
