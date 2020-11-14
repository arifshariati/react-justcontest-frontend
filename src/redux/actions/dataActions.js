import {
  LOADING_DATA,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_CANDIDATE,
  UNSET_CANDIDATE,
  SET_CANDIDATE_PICTURE,
  SET_CONTEST,
  UNSET_CONTEST,
  SET_CANDIDATES,
  SET_CONTEST_COMMENT,
  SET_CONTEST_CANDIDATE,
  UNSET_CONTEST_CANDIDATE,
  SET_CANDIDATE_VOTE,
  UNSET_CANDIDATE_VOTE,
  UPDATE_CANDIDATE_VOTE,
  LOAD_REDUX_DATA_FIELDS,
  STOP_LOADING_UI,
  STOP_LOADING_DATA,
} from "../types";

import Axios from "axios";

// Candidates

export const addNewCandidate = (candidateData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  Axios.post("admin/addNewCandidate", candidateData)
    .then((res) => {
      //const payload = { userCandidates: res.data };
      dispatch({ type: STOP_LOADING_DATA });

      dispatch({
        type: SET_CANDIDATE,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const uploadCandidatePicture = (formData, candidateId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  Axios.post(`/admin/uploadCandidatePicture/${candidateId}`, formData)
    .then((res) => {
      dispatch({ type: STOP_LOADING_DATA });
      dispatch({
        type: SET_CANDIDATE_PICTURE,
        payload: { imageUrl: res.data, candidateId },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCandidate = (candidateId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  Axios.delete(`admin/deleteCandidate/${candidateId}`)
    .then(() => {
      dispatch({ type: STOP_LOADING_DATA });

      dispatch({
        type: UNSET_CANDIDATE,
        payload: candidateId,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const addNewContest = (contestData) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });

  Axios.post("admin/addNewContest", contestData)
    .then((res) => {
      //const payload = { userCandidates: res.data };
      //console.log(res.data);
      dispatch({
        type: SET_CONTEST,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const AddContestNewCandidate = (data) => (dispatch) => {
  Axios.post(`/admin/addContestNewCandidate/${data.contestId}`, data)
    .then((res) => {
      //const payload = { contestId: data.contestId, data: res.data };
      console.log(res.data);
      dispatch({
        type: SET_CONTEST_CANDIDATE,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const deleteContestCandidate = (data) => (dispatch) => {
  Axios.post(
    `/admin/deleteContestCandidate/${data.contestId}/${data.candidateId}`
  )
    .then((res) => {
      dispatch({
        type: UNSET_CONTEST_CANDIDATE,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};
export const deleteContest = (contestData) => (dispatch) => {
  Axios.post(`admin/deleteContest`, contestData)
    .then(() => {
      dispatch({
        type: UNSET_CONTEST,
        payload: contestData.contestId,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const addCommentOnContest = (data) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
  //console.log(data);

  Axios.post(`admin/addCommentOnContest`, data)
    .then((res) => {
      dispatch({
        type: SET_CONTEST_COMMENT,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// this is for testing purpose
export const loadReduxDataFields = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  Promise.all([
    Axios.get("/admin/showSummary"),
    Axios.get("/admin/showSummaryLog"),
    Axios.get("/admin/showContests"),
    Axios.get("/admin/showCandidates"),
    Axios.get("/admin/showContestCandidates"),
    Axios.get("/admin/showVotes"),
    Axios.get("/admin/showComments"),
  ]).then((response) => {
    dispatch({ type: STOP_LOADING_UI });

    dispatch({
      type: LOAD_REDUX_DATA_FIELDS,
      payload: {
        summary: response[0].data,
        summaryLog: response[1].data,
        contests: response[2].data,
        candidates: response[3].data,
        contestCandidates: response[4].data,
        votes: response[5].data,
        comments: response[6].data,
      },
    });
    //console.log(response);
  });
};

export const showCandidates = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  Axios.get("admin/showCandidates")
    .then((res) => {
      //console.log(res.data);
      dispatch({
        type: STOP_LOADING_DATA,
      });

      dispatch({
        type: SET_CANDIDATES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getContest = (contestId) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  Axios.get(`/admin/getContest${contestId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.code);
    });
};

export const submitVote = (voteData) => (dispatch) => {
  //console.log(voteData);
  Axios.post(`admin/submitVote`, voteData)
    .then((res) => {
      //console.log(res.data);
      switch (res.data.type) {
        case "removeVote": {
          dispatch({
            type: UNSET_CANDIDATE_VOTE,
            payload: {
              voteId: res.data.voteId,
              contestId: res.data.contestId,
              candidateId: res.data.candidateId,
              userId: res.data.userId,
              createdAt: res.data.createdAt,
            },
          });
          dispatch({
            type: CLEAR_ERRORS,
          });
          return;
        }
        case "updateVote": {
          dispatch({
            type: UPDATE_CANDIDATE_VOTE,
            payload: {
              voteId: res.data.voteId,
              contestId: res.data.contestId,
              candidateId: res.data.candidateId,
              oldCandidateId: res.data.oldCandidateId,
              userId: res.data.userId,
              createdAt: res.data.createdAt,
            },
          });
          dispatch({
            type: CLEAR_ERRORS,
          });
          return;
        }
        default: {
          dispatch({
            type: SET_CANDIDATE_VOTE,
            payload: res.data,
          });
          dispatch({
            type: CLEAR_ERRORS,
          });
          return;
        }
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
