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
import { addNewCandidate } from "../../../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {},
});

class NewCandidate extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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

    const newCandidateData = {
      name: this.state.name,
      userId: this.props.userId,
    };
    this.setState({
      name: "",
    });
    this.props.addNewCandidate(newCandidateData, this.props.history);
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
          <CardHeader subheader="Add New Candidate" title="Candidate" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  helperText={errors.planName}
                  className={classes.textField}
                  error={errors.planName ? true : false}
                  label="Candidate Name"
                  margin="dense"
                  name="name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Tooltip title="Add New Candidate">
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

NewCandidate.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  addNewCandidate: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  addNewCandidate,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewCandidate));
