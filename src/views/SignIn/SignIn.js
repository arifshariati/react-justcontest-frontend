import React, { Component } from "react";
import propTypes from "prop-types";

//firebase
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";

//Redux

import { connect } from "react-redux";
import { signIn, signInWithSocialMedia } from "../../redux/actions/userActions";

firebase.initializeApp({
  apiKey: "AIzaSyAJ2_INHdaO7t-Tc-dMIy4jwPjnMKs8itc",
  authDomain: "voting-functions.firebaseapp.com",
});

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
    color: theme.palette.white,
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
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
});

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log(this.state.isSignedIn);
    });
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token) => {
            this.props.signInWithSocialMedia(token, this.props.history);
          })
          .catch((err) => {
            console.log(err);
          });
        //this.props.signInWithSocialMedia(firebase.auth().currentUser.getIdToken(),this.props.history)
        //console.log(firebase.auth().currentUser.getIdTokenResult());
      },
      //signInSuccess: () => false
    },
  };

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleSubmit = (event) => {
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
  }; */

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}></div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                {!this.state.isSignedIn && (
                  <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                )}

                {/* <form className={classes.form} onSubmit={this.handleSubmit}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>
                  <Typography color="textPrimary" gutterBottom>
                    Sign in with social media
                  </Typography>
                  <Grid className={classes.socialButtons} container spacing={2}>
                    <Grid item>
                      <Button
                        color="primary"
                        onClick={this.handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        <FacebookIcon className={classes.socialIcon} />
                        Login with Facebook
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        <GoogleIcon className={classes.socialIcon} />
                        Login with Google
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    align="center"
                    className={classes.sugestion}
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
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
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    //disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>

                  <Typography color="textSecondary" variant="body1">
                    Forgot Your Password?{" "}
                    <Link
                      component={RouterLink}
                      to="/resetPassword"
                      variant="h6"
                    >
                      Reset Password
                    </Link>
                  </Typography>

                  <Typography color="textSecondary" variant="body1">
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/sign-up" variant="h6">
                      Sign up
                    </Link>
                  </Typography>

                  {errors.general && (
                    <Alert severity="error">
                      <AlertTitle>Error - Wrong Credentials</AlertTitle>
                      {errors.general} — <strong>Try Again</strong>
                    </Alert>
                  )}
                </form> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
SignIn.propTypes = {
  classes: propTypes.object.isRequired,
  signIn: propTypes.func.isRequired,
  signInWithSocialMedia: propTypes.func,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  signIn,
  signInWithSocialMedia,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignIn));
