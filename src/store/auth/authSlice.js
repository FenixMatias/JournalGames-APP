import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
       status: 'checking', // 'checking', 'not-aunthenticated', 'authenticated'
       uid: null,
       email: null,
       displayName: null,
       photoURL: null,
       errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'; // 'checking', 'not-aunthenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null; 
        },
        logout: (state, { payload }) => {
            state.status = 'not-aunthenticated'; // 'checking', 'not-aunthenticated', 'authenticated'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        checkingErrors: (state) => {
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, checkingErrors } = authSlice.actions;