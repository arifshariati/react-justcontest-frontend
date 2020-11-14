import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
//import "./App.css";
import theme from "./theme";
//import jwtDecode from "jwt-decode";
import Axios from "axios";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";

// MUI
import { ThemeProvider } from "@material-ui/styles";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_SIGNEDIN } from "./redux/types";

import { getUsertData } from "./redux/actions/userActions";
import { loadReduxDataFields } from "./redux/actions/dataActions";

const browserHistory = createBrowserHistory();

Axios.defaults.baseURL =
  "https://europe-west1-voting-functions.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  //const decodedToken = jwtDecode(token);

  /* if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(signOut());
    window.location.href = "/contest";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch({ type: SET_SIGNEDIN });

    Axios.defaults.headers.common["Authorization"] = token;

    store.dispatch(getUsertData());
    store.dispatch(loadReduxDataFields());

  } */

  store.dispatch({ type: SET_AUTHENTICATED });
  store.dispatch({ type: SET_SIGNEDIN });

  Axios.defaults.headers.common["Authorization"] = token;

  store.dispatch(getUsertData());
  store.dispatch(loadReduxDataFields());
} else {
  store.dispatch(loadReduxDataFields());
}

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}
