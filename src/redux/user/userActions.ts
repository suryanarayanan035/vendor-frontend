import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from "./userTypes";

export const loginUserSuccess = () => {
  return {
    type: LOGIN_USER_SUCCESS,
  };
};

export const loginUserFailure = () => {
  return {
    type: LOGIN_USER_FAILURE,
  };
};
