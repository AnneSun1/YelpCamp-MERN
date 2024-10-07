import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
    user: null,
    loading: false,
    error: null,
};

// Create the user slice using Redux Toolkit
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        fetchUserRequest: (state) => {
            state.loading = true;
            state.error = null; 
        },

        fetchUserSuccess: (state, action) => {
            state.user = action.payload; // Store the fetched user data
            state.loading = false;
            state.error = null; // Reset any existing errors
        },

        fetchUserFailure: (state, action) => {
            state.user = null; // Clear user data on failure
            state.loading = false;
            state.error = action.payload; // Store the error message
        },

        // setUserInfo: (state, action) => {
        //     state.user = action.payload; 
        // },

        logoutUser: (state) => {
            state.user = null; 
            state.error = null;
            state.loading = false;
        },
    },
});

// Export the generated action creators
export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure, logoutUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
