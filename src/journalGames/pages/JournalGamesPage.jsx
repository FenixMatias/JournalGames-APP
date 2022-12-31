import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journalGames';
import { JournalGamesLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalGamesPage = () => {

    const { isSaving, active } = useSelector(state => state.journalGames);
    const dispatch = useDispatch();

    const onclickNewNote = () => {

        dispatch(startNewNote());
    }
    
    return (
        <JournalGamesLayout>
            {
                (!!active) 
                ? 
                    <NoteView />
                : 
                    <NothingSelectedView />
            }
            <IconButton
                disabled={isSaving}
                onClick={onclickNewNote}
                size="large"
                sx={{color: 'white', backgroundColor: 'error.main', ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed', right: 50, bottom: 50}}
            >
                <AddOutlined sx={{fontSize: 30}}/>
            </IconButton>
        </JournalGamesLayout>
    )
}