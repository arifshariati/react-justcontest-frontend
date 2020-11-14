import React, { Component } from "react";
import propTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
//Redux

import { connect } from "react-redux";
import {
  reSendVerificationEmail,
  signIn,
} from "../../redux/actions/userActions";
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
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
  handleReSendVerificationEmail = (event) => {
    event.preventDefault();

    //this.props.signUp(userData, this.props.history);
    this.props.reSendVerificationEmail();
  };

  handleSignIn = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signIn(userData, this.props.history);
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
              {/* <div className={classes.contentHeader}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div> */}
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  onSubmit={this.handleReSendVerificationEmail}
                >
                  <Typography className={classes.title} variant="h2">
                    You are Almost there !
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    You are here because you did not verify your email. You can
                    find verification email in your Inbox / Junk Box. Please
                    verify your email before using our services.
                  </Typography>

                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Re-Send Verification Email
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    Could not find verification Email? No worries, request
                    Re-Send Verification Email button above and you will have it
                    in your inbox now.
                  </Typography>
                </form>
              </div>

              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={this.handleSignIn}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    Sign in with social media
                  </Typography>

                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.email}
                    error={errors.general ? true : false}
                    label="Email address"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.email}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.password}
                    error={errors.general ? true : false}
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.password}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    If you have verified your email, Go to Login Page by
                    clicking above button.
                  </Typography>

                  {errors.general && (
                    <Alert severity="error">
                      <AlertTitle>Error - Wrong Credentials</AlertTitle>
                      {errors.general} — <strong>Try Again</strong>
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

SignUp.propTypes = {
  classes: propTypes.object.isRequired,
  reSendVerificationEmail: propTypes.func.isRequired,
  signIn: prototype.func,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  UI: state.UI,
});

const mapActionsToProps = {
  reSendVerificationEmail,
  signIn,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignUp));
