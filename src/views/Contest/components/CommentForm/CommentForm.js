import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Button, TextField, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Redux
import { connect } from "react-redux";
import { addCommentOnContest } from "../../../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {},
});

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleSubmit = (userId) => (event) => {
    event.preventDefault();

    const newCommentData = {
      comment: this.state.comment,
      contestId: this.props.contestId,
      userId,
    };
    this.setState({
      comment: "",
      errors: {},
    });
    this.props.addCommentOnContest(newCommentData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      user: {
        userDetails: { userId },
      },
    } = this.props;
    const { errors } = this.state;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit(userId)}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xl={10} lg={10} xs={10} sm={10}>
            <TextField
              fullWidth
              multiline
              rows={5}
              helperText={errors.comment}
              className={classes.textField}
              error={errors.comment ? true : false}
              label="Comment"
              margin="dense"
              name="comment"
              type="text"
              onChange={this.handleChange}
              value={this.state.comment}
              variant="outlined"
            />
          </Grid>
          <Grid item xl={2} lg={2} xs={2} sm={2}>
            <Tooltip title="Add New Contest">
              <Button color="inherit" type="submit" variant="outline">
                <AddCircleIcon color="primary" />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    );
  }
}

CommentForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  contestId: PropTypes.string,
  addNCommentOnContest: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  addCommentOnContest,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
