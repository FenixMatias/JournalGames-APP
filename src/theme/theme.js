import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const theme = createTheme({

    palette: {
        primary: {
            main: '#151154'
        },
        secondary: {
            main: '#432773'
        },
        error: {
            main: red.A400
        }
    }
});