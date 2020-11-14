import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Redux
import { connect } from "react-redux";
import { addNewContest } from "../../../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {},
});

class NewContest extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
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
  handleSubmit = (event) => {
    event.preventDefault();

    const newContestData = {
      title: this.state.title,
      description: this.state.description,
      userId: this.props.userId,
    };
    this.setState({
      title: "",
      description: "",
      errors:{}
    });
    this.props.addNewContest(newContestData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { errors } = this.state;
    return (
      <Card {...rest} className={clsx(classes.root, className)}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <CardHeader subheader="Add New Contest" title="Contest" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  helperText={errors.title}
                  className={classes.textField}
                  error={errors.title ? true : false}
                  label="Contest Title"
                  margin="dense"
                  name="title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                  variant="outlined"
                />
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  helperText={errors.description}
                  className={classes.textField}
                  error={errors.description ? true : false}
                  label="Contest Description"
                  margin="dense"
                  name="description"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.description}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Tooltip title="Add New Contest">
              <Button color="inherit" type="submit" variant="outline">
                <AddCircleIcon color="primary" />
              </Button>
            </Tooltip>
          </CardActions>
        </form>
      </Card>
    );
  }
}

NewContest.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  addNewContest: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  addNewContest,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewContest));
