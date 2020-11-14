import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Tooltip } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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

const Candidate = ({ candidate, deleteContestCandidate }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={candidate.picture}
        title="Paella dish"
      />

      <CardActions className={classes.CardActionPadding}>
        <Box margin="auto" padding="none">
          {candidate.voteCount === 0 ? (
            <Tooltip title="Remove Candidate from Contest">
              <IconButton
                aria-label="add to favorites"
                onClick={deleteContestCandidate}
              >
                <DeleteIcon color="secondary" fontSize="default" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Can not Delete Candidate">
              <div>
                <IconButton aria-label="add to favorites" disabled="true">
                  <DeleteIcon color="disabled" fontSize="default" />
                </IconButton>
              </div>
            </Tooltip>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Candidate;
