import Axios from "axios";
import firebase from "firebase";

// getPlans from dataActions
import { loadReduxDataFields } from "./dataActions";

import {
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_CONTESTS,
  UPDATE_USER_DETAILS_COMMENTS,
  SET_USER,
  SET_USER_PICTURE,
  SET_USER_PICTURE_COMMENTS,
  SET_USER_PICTURE_CONTESTS,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_SIGNEDIN,
  SET_SIGNEDOUT,
} from "../types";

export const signUp = (newUserData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.post("/admin/signupWithEmail", newUserData)
    .then((res) => {
      if (res.data.emaillVerified === true) {
        setAuthorizationHeader(res.data.token);

        dispatch(getUsertData());
        dispatch(loadReduxDataFields());

        dispatch({
          type: CLEAR_ERRORS,
        });

        history.push("/contest");
      } else {
        history.push("/emailVerification");
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const reSendVerificationEmail = (history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.post("admin/reSendEmailVerification")
    .then((res) => {
      if (res.data.emailVerified === true) {
        history.push("/sign-in");
      } else {
        history.push("/emailVerification");
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const signInWithSocialMedia = (token, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  setAuthorizationHeader(token);
  dispatch({ type: SET_SIGNEDIN });
  dispatch(getUsertData());
  dispatch(loadReduxDataFields());

  dispatch({
    type: CLEAR_ERRORS,
  });
  history.push("/contest");
};
export const signIn = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.post("admin/loginWithEmail", userData)
    .then((res) => {
      if (res.data.emailVerified === true) {
        setAuthorizationHeader(res.data.token);

        dispatch(getUsertData());
        dispatch(loadReduxDataFields());

        dispatch({
          type: CLEAR_ERRORS,
        });

        history.push("/contest");
      } else {
        history.push("/emailVerification");
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const resetPassword = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.post("admin/resetPassword", userData)
    .then((res) => {
      /* if (res.data.emailVerified === true) {
        history.push("/sign-in");
      } else {
        history.push("/emailVerification");
      } */
      history.push("/sign-in");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUsertData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  Axios.get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const signOut = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: SET_SIGNEDOUT,
      });

      localStorage.removeItem("FBIdToken");
      localStorage.removeItem("firebaseui::rememberedAccounts");

      delete Axios.defaults.headers.common["Authorization"];

      window.location.href = "/contest";
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });

  Axios.post("/admin/uploadProfileImage", formData)
    .then((res) => {
      //console.log(res.data);
      dispatch({
        type: SET_USER_PICTURE,
        payload: res.data,
      });
      dispatch({
        type: SET_USER_PICTURE_CONTESTS,
        payload: res.data,
      });
      dispatch({
        type: SET_USER_PICTURE_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edituserdetails = (userDetails) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });

  Axios.post("/admin/updateUserDetails", userDetails)
    .then((res) => {
      //console.log(res.data);
      dispatch({
        type: UPDATE_USER_DETAILS,
        payload: res.data,
      });

      dispatch({
        type: UPDATE_USER_DETAILS_CONTESTS,
        payload: res.data,
      });

      dispatch({
        type: UPDATE_USER_DETAILS_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Contests

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;

  localStorage.setItem("FBIdToken", FBIdToken);

  Axios.defaults.headers.common["Authorization"] = FBIdToken;
};
