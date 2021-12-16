import { createStore } from "redux";
import userReducer from "./user/userReducers";
const store = createStore(userReducer);
export default store;
