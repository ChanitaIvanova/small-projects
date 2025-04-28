import { createSlice } from "@reduxjs/toolkit"

const token = localStorage.getItem("authToken")

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!token,
        token: token || null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload
            state.isLoggedIn = true
            localStorage.setItem("authToken", action.payload)
        },
        logout: (state) => {
            state.token = null
            state.isLoggedIn = false
            localStorage.removeItem("authToken")
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer