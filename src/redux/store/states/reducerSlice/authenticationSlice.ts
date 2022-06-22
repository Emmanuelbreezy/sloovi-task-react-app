import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationState } from "../initialState";


export const authenticationSlice = createSlice({
    
    name: 'authentication',
    initialState:AuthenticationState,
    reducers: {
       setUser:(state, action: PayloadAction<{ accessToken: string | null; companyId: string | null; userId: string | null; isAuth:boolean; name: string | null}>) => {
           state.accessToken = action.payload.accessToken;
           state.companyId = action.payload.companyId;
           state.userId = action.payload.userId;
           state.isAuth = action.payload.isAuth;
           state.name = action.payload.name;
       },
       removeUser:(state)=>{
        state.accessToken = null;
        state.companyId = null;
        state.userId = null;
        state.isAuth = false;
        state.name = null;
       }
    }
})

export const { setUser,removeUser} = authenticationSlice.actions;

export default authenticationSlice.reducer;
