import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState{
    authState:boolean;
    user: { [key: string]: any } | null;
        token:string|null;
        userType:string|null;
};
const initialState:AuthState={
    authState:false,
    userType:null,
    user:null,
    token:null,
};
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userLogin: (state, action: PayloadAction<{  user: { [key: string]: any } ; token: string;userType:string }>) => {
            state.authState = true;
            state.userType=action.payload.userType;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        userLogout:(state)=>{
            state.authState=false;
            state.userType=null;
            state.user=null;
            state.token=null;
        }
    }
})
export const {userLogin,userLogout}=authSlice.actions;
export default authSlice.reducer;