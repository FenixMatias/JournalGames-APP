import { createSlice } from '@reduxjs/toolkit';

export const JournalGamesSlice = createSlice({

    name: 'journalGames',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], //https://photo1.jpg
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNote: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
            // TODO: Mensaje de error...
        },
        updateNoteById: (state, action) => {
            state.isSaving = false;
            state.notes = state?.notes.map(note => {// payload: note
                
                if(note.id === action.payload.id){

                    return action.payload;
                }

                return note;
            });
            // TODO: Mostrar mensaje de actualización
            state.messageSaved = `${action.payload.title}, nota actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null,
            state.notes = state.notes.filter(note => note.id !== action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, 
                setNote, setSaving, updateNoteById, setPhotosToActiveNote, clearNotesLogout, deleteNoteById } = JournalGamesSlice.actions;