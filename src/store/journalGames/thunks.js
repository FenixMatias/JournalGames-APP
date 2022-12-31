import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase';
import { fileUpload, loadNotes } from '../../journalGames';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote, setPhotosToActiveNote, setSaving, 
        updateNoteById, deleteNoteById } from './journalGamesSlice';

export const startNewNote = () => {

    return async(dispatch, getstate) => {

        dispatch(savingNewNote());
        
        //uid
        const { uid } = getstate().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FireBaseDB, `${uid}/journalGames/notes`));
        
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        //!dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {

    return async(dispatch, getstate) => {

        const { uid } = getstate().auth;

        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNote(notes));
    }
}

export const startSaveNote = () => {

    return async(dispatch, getstate) => {

        dispatch(setSaving());

        const { uid } = getstate().auth;
        const { active: note } = getstate().journalGames;
        const noteToFireStore = { ...note };

        delete noteToFireStore.id;
        
        const docRef = doc(FireBaseDB, `${uid}/journalGames/notes/${note.id}`);

        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNoteById(note));
    }
}

export const startUploadingFiles = (files = []) => {

    return async(dispatch) => {

        dispatch(setSaving());

        // await fileUpload(files[0]);
        const fileUploadPromises = [];

        for(const file of files){

            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {

    return async(dispatch, getstate) => {

        const { uid } = getstate().auth;
        const { active: note } = getstate().journalGames;
        const docRef = doc(FireBaseDB, `${uid}/journalGames/notes/${note.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}