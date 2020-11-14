import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";

import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
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

class candidate extends Component {
  render() {
    //const classes = useStyles();
    const { classes, candidate } = this.props;
    /* const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }; */

    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={candidate.picture}
          title="Paella dish"
        />

        <CardActions className={classes.CardActionPadding}>
          <Box margin="auto" padding="none">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(candidate);
