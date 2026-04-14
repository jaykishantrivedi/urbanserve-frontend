import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState: {
        userData : null,
        tempEmail : null
    },
    reducers: {
        setCredentials : (state,action) => {
            state.userData = action.payload
        },
        setTempEmail : (state,action) => {
            state.tempEmail = action.payload
        },
        clearTempEmail : (state) => {
            state.tempEmail = null
        },
        logout : (state) => {
            state.userData = null
        }
    }
})

export const { setCredentials, logout, setTempEmail, clearTempEmail } = authSlice.actions
export default authSlice.reducer