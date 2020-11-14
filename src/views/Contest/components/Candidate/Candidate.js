import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Card, Typography, Tooltip } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";

import Box from "@material-ui/core/Box";

// Icons 
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

//Redux
import { connect } from "react-redux";
import { submitVote } from "../../../../redux/actions/dataActions";
import { signIn } from '../../../../redux/actions/userActions';


const styles = (theme) => ({
  ...theme.palette.spreadThis,
  root: {
    maxWidth: 345,
    justifyContent: "center",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  avatar: {
    backgroundColor: "red[500]",
  },
  CardActionPadding: {
    padding: "0",
  },
});

class Candidate extends Component {
  render() {
    //const classes = useStyles();
    const {
      classes,
      candidate,
      user: {
        authenticated,
        userDetails: { userId },
      },
      contestId,
    } = this.props;
    /* const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }; */

    const handleVote = () => (event) => {
      event.preventDefault();
      let voteData = {
        candidateId: candidate.candidateId,
        contestId,
        userId,
      };
      this.props.submitVote(voteData);
    };

    const handleSignIn = ()=>{
      window.location.href = '/sign-in';
    }

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={candidate.picture}
          title="Paella dish"
        />

        <CardActions className={classes.CardActionPadding}>
          <Box margin="auto" padding="none">
            {candidate.userId === userId ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Tooltip title="You can not vote on your own contest">
                    <div>
                      <IconButton aria-label="Vote Candidate" disabled>
                        <ThumbUpOutlinedIcon color="primary" fontSize="default" />
                      </IconButton>
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="primary" align="left">
                    {candidate.voteCount}
                  </Typography>
                </Grid>
              </Grid>
            ) : candidate.voteCount === 0 ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  {authenticated ? (

                  <Tooltip title="Vote Candidate">
                    <IconButton
                      aria-label="Vote Candidate"
                      onClick={handleVote()}
                    >
                      <ThumbUpOutlinedIcon color="primary" fontSize="default" />
                    </IconButton>
                  </Tooltip>
                  ) : (
                    <Tooltip title="You are not Authorized to Vote">
                      <IconButton
                        aria-label="Vote Candidate"
                        onClick={handleSignIn}
                      >
                        <ThumbUpOutlinedIcon color="primary" fontSize="default" />
                      </IconButton>
                  </Tooltip>
                  )}
                  
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="primary" align="left">
                    {candidate.voteCount}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  
                    {authenticated ? (
                      <Tooltip title="Un-Vote Candidate">
                      <IconButton
                      aria-label="Vote Candidate"
                      onClick={handleVote()}
                    >
                      <ThumbUpIcon color="primary" fontSize="default" />
                    </IconButton>
                    </Tooltip>
                    ) : (
                      <Tooltip title="You are not Authorized to Vote">
                          <IconButton
                          aria-label="Vote Candidate"
                          onClick={handleSignIn}
                        >
                          <ThumbUpIcon color="primary" fontSize="default" />
                        </IconButton>
                    </Tooltip>
                    )}
                    
                  
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="primary" align="left">
                    {candidate.voteCount}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </CardActions>
      </Card>
    );
  }
}

Candidate.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  data: PropTypes.object,
  candidate: PropTypes.object.isRequired,
  contestId: PropTypes.string.isRequired,
  submitVote: PropTypes.func.isRequired,
  signIn: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionsToProps = {
  submitVote,
  signIn
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Candidate));
