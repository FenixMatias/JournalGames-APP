import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journalGames';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journalGames);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {

        const newdate = new Date(date);

        return newdate.toLocaleString();

    }, [date]);

    useEffect(() => {

        dispatch(setActiveNote(formState));

    }, [formState]);

    const onSaveNote = () => {

        dispatch(startSaveNote());
    }

    useEffect(() => {

        if(messageSaved.length > 0){

            Swal.fire({
                title: 'Nota Actualizada',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }

        dispatch(setActiveNote(formState));

    }, [messageSaved]);

    const fileInputRef = useRef();

    const onFileInputChange = ({target}) => {

        if (target.files === 0) return;
        
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {

        Swal.fire({
            title: '¿Estas seguro de eliminar la nota?',
            text: "Una vez eliminada no podras revertir la acción",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeletingNote());
                Swal.fire(
                    'Eliminada!',
                    'La nota ha sido eliminada correctamente.',
                    'success'
                )
            }
        })
    }

    return (

        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography 
                    fontSize={39}
                    fontWeight="light"
                >
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <input 
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                    ref={fileInputRef}
                />
                <IconButton 
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote} 
                    color="primary"
                    sx={{padding: 2}}
                >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Título"
                    sx={{border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Ingrese una descripción"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid 
                container
                justifyContent="end"
            >
                <Button
                    disabled={isSaving}
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Eliminar
                </Button>
            </Grid>
            <ImageGallery images={note.imageUrls}/>
        </Grid>
    )
}