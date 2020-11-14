import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Tooltip } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
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
}));

const Candidate = ({ candidate, AddCandidateToContest }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={candidate.picture}
        title="Paella dish"
      />

      <CardActions className={classes.CardActionPadding}>
        {/* <Box margin="auto" padding="none">
          {candidate.voteCount === 0 && (
            <Tooltip title="Add New Contest">
              <IconButton
                aria-label="add to favorites"
                onClick={AddCandidateToContest}
              >
                <AddCircleIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Box> */}

        <Box margin="auto" padding="none">
          <Tooltip title="Add New Contest">
            <IconButton
              aria-label="add to favorites"
              onClick={AddCandidateToContest}
            >
              <AddCircleIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Candidate;
