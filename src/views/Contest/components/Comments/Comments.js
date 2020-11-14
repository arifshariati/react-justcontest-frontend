import React, { Fragment } from "react";
import moment from "moment";
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
  const {
    user: { authenticated },
  } = props;

  return (
    <Fragment>
      {authenticated && <CommentForm contestId={props.contestId} />}

      <List className={classes.root}>
        {/* <ListItem alignItems="flex-start">
        <CommentForm contestId={props.contestId} />
      </ListItem> */}
        {Object.keys(props.comments).length > 0 ? (
          props.comments
            .filter(
              (filterdComments) => filterdComments.contestId === props.contestId
            )
            .map((filteredComments, index) => (
              <Fragment>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={filteredComments.picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      filteredComments.name +
                      " " +
                      moment(filteredComments.createdAt).fromNow()
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {filteredComments.comment}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index !== filteredComments.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Fragment>
            ))
        ) : (
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
          >
            <h1>No Comment Yet</h1>
          </Typography>
        )}
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
