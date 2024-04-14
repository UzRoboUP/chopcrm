import { createSlice } from "@reduxjs/toolkit"

type UserType = {
    name:string,
    surname:string
    role:string
  };

const initialState:UserType = {
   name:"",
   surname:"",
   role:"USER"
}

export const UserSlice = createSlice({
    name: "auth/user",
    initialState,
    reducers: {
  
    }
})
// export const {} = sessionSlice.actions
export default UserSlice.reducer;