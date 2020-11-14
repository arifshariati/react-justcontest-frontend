import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { addCommentOnContest } from "../../../../redux/actions/dataActions";
import CommentForm from "../CommentForm";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Comments = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CommentForm contestId={props.contestId} />
      <List className={classes.root}>
        {/* <ListItem alignItems="flex-start">
        <CommentForm contestId={props.contestId} />
      </ListItem> */}
        {props.comments.map((comment, index) => (
          <Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={comment.picture} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.comment}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index !== props.comments.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

Comment.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object.isRequired,
  addCommentOnContest: PropTypes.func,
};
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});
const mapActionsToProps = {
  addCommentOnContest,
};
export default connect(mapStateToProps, mapActionsToProps)(Comments);
