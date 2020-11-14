
import {
  SET_SIGNEDIN,
  SET_SIGNEDOUT,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_USER_PICTURE,
  UPDATE_USER_DETAILS,
} from "../types";

const initialState = {
  isSignedIn:false,
  authenticated: false,
  loading: false,
  userDetails: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIGNEDIN:
      return {
        ...state,
        isSignedIn: true,
        authenticated:true
      };
    case SET_SIGNEDOUT:
      return initialState;
      
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case SET_USER_PICTURE:
      return {
        ...state,
        loading: false,
        userDetails: {
          ...state.userDetails,
          profileImage: action.payload.profileImage,
        },
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        loading:false,
        userDetails:{
          ...state.userDetails,
          name: action.payload.name,
          phone: action.payload.phone
        }
      }

    default:
      return state;
  }
}
