import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journalGames';

export const SideBarItem = ({title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const newTile = useMemo(() =>  {

        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;

    }, [title]);

    const activateNote = () => {

        dispatch(setActiveNote({title, body, id, date, imageUrls}));
    }

    return (
        <ListItem 
            disablePadding
        >
            <ListItemButton onClick={activateNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTile}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

