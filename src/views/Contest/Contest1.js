import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

// components
import LoadingSpinner from '../../components/LoadingSpinner';
import { Candidate, ProgressBar, Comments } from "./components";
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.palette.spreadThis,
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
});

export class Contest extends Component {
  render() {
    //const classes = useStyles();
    const {
      classes,
      data: { contests },
      UI: { loading }
    } = this.props;

    /* const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }; */

    return (
      <div className={classes.root}>
        { loading ? (<LoadingSpinner />):(

<Grid container spacing={1} justify="center">
{contests.map((contest) => (
  <Grid item xl={4} lg={4} sm={12} xs={12}>
    <Card>
      <Grid container spacing={0}>
        <Grid item xl={12} lg={12} sm={12} xs={12}>
          <CardHeader
            title={contest.title}
            subheader={contest.description}
          />
        </Grid>

        {/* <Grid item xl={12} lg={12} sm={12} xs={12}>
          <CardContent className={classes.CardContent}>
            <Typography
              variant="body2"
              component="h1"
              align="justified"
            >
              {contest.description}
            </Typography>
          </CardContent>
        </Grid> */}

        <Grid item xl={12} lg={12} sm={12} xs={12}>
          <Grid container spacing={1} justify="center">
            {contest.candidatesDetail &&
              contest.candidatesDetail.map((candidate) => (
                <Grid item xl={6} lg={6} sm={6} xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xl={12} lg={12} sm={12} xs={12}>
                      <Candidate candidate={candidate} />
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
                          <ProgressBar value={90} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {contest.userDetails && (
          <Grid item xl={12} lg={12} sm={12} xs={12}>
            <CardActions>
              <Avatar
                aria-label="profileImage"
                src={contest.userDetails.profileImage}
                className={classes.avatar}
              >
                R
              </Avatar>

              <Typography
                variant="body2"
                component="h1"
                align="center"
              >
                {contest.userDetails.firstName +
                  contest.userDetails.lastName}
              </Typography>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="caption"
                component="h1"
                align="left"
              >
                {contest.voteCountTotal}
              </Typography>
              <IconButton aria-label="Comments">
                <ChatBubbleIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="caption"
                component="h1"
                align="left"
              >
                {contest.commentCountTotal}
              </Typography>
              <IconButton aria-label="share">
                <ShareIcon fontSize="small" />
              </IconButton>

              <Comments />

              {/* <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton> */}
            </CardActions>
          </Grid>
        )}
      </Grid>
    </Card>
  </Grid>
))}
</Grid>
        )}
      </div>
    );
  }
}

Contest.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object,
  UI: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps)(withStyles(styles)(Contest));
