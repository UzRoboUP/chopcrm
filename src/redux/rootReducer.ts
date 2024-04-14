import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./auth/userSlice";
import sessionSlice from "./auth/sessionSlice";
const RootReducer = combineReducers({
    userSlice,
    sessionSlice

})
export default RootReducer