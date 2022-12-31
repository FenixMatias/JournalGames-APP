import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { JournalGamesSlice } from './journalGames';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journalGames: JournalGamesSlice.reducer
    },
});