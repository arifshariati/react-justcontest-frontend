import React, { Component } from "react";
import propTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
//Redux

import { connect } from "react-redux";
import { resetPassword } from "../../redux/actions/userActions";
import { prototype } from "chart.js";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth-side2.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.secondary.main,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  ResetPasswordButton: {
    margin: theme.spacing(2, 0),
  },
});

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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

  handleResetPassword = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
    };

    this.props.resetPassword(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    const { errors } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <img
              alt="Email Verification"
              src="/tempImages/emailVerification.png"
            />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={this.handleResetPassword}
                >
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    label="Email address"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.email}
                    variant="outlined"
                  />
                  <Button
                    className={classes.ResetPasswordButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Send Password Re-Set Verification
                  </Button>

                  {errors.general && (
                    <Alert severity="error">
                      <AlertTitle>Error </AlertTitle>
                      {errors.general} — <strong>Try Correct Email</strong>
                    </Alert>
                  )}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: propTypes.object.isRequired,
  reSendVerificationEmail: propTypes.func.isRequired,
  resetPassword: prototype.func,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  UI: state.UI,
});

const mapActionsToProps = {
  resetPassword,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ResetPassword));
