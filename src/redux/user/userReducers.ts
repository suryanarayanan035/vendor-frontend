import { LOGIN_USER_SUCCESS } from "./userTypes";

export const initialState = {
  currentUsername: "admin",
  isLoggedIn: true,
};
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default userReducer;
