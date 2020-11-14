import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import propTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Button, TextField, Link, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
//Redux

import { connect } from "react-redux";
import { signUp } from "../../redux/actions/userActions";

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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
  handleSignUp = (event) => {
    event.preventDefault();

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signUp(userData, this.props.history);
  };

  handleChange = (event) => {
    //event.preventDefault();
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
            {
              <div className={classes.quote}>
                {/* <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div> */}
              </div>
            }
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              {/* <div className={classes.contentHeader}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div> */}
              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={this.handleSignUp}>
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Use your email to create new account
                  </Typography>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.firstName}
                    error={errors.firstName ? true : false}
                    label="First name"
                    name="firstName"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.firstName}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.lastName}
                    error={errors.lastName ? true : false}
                    label="Last name"
                    name="lastName"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.lastName}
                    variant="outlined"
                  />
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
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.password}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    label="Confirm Password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.confirmPassword}
                    variant="outlined"
                  />
                  {/* <div className={classes.policy}>
                    <Checkbox
                      checked={this.state.policy}
                      className={classes.policyCheckbox}
                      color="primary"
                      name="policy"
                      onChange={this.handleChange}
                    />
                    <Typography
                      className={classes.policyText}
                      color="textSecondary"
                      variant="body1"
                    >
                      I have read the{" "}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </div> */}
                  {/* {hasError("policy") && (
                    <FormHelperText error>
                      {formState.errors.policy[0]}
                    </FormHelperText>
                  )} */}
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/sign-in" variant="h6">
                      Sign in
                    </Link>
                  </Typography>

                  {errors.email && (
                    <Alert severity="error">
                      <AlertTitle>Error - Email Already in use</AlertTitle>
                      {errors.email} —{" "}
                      <strong>
                        If this is your Email, Proceed to Login Instead
                      </strong>
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
  signUp: propTypes.func.isRequired,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  UI: state.UI,
});

const mapActionsToProps = {
  signUp,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignUp));
