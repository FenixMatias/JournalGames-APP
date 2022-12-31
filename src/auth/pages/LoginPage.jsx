import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { checkingErrors, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { AuthLayout } from '../layout';

const formData = {

    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticated = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {

        event.preventDefault();

        dispatch(startLoginWithEmailPassword({email, password}));

    }

    const onGoogleSingIn = () => {

        dispatch(startGoogleSignIn());
    }

    const cleanError = () => {

        dispatch(checkingErrors());

    }

    return (
        <AuthLayout title="Iniciar Sesión">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" >
                <Grid container>
                    <Grid item xs={12} sx={{mt: 4}}>
                        <TextField 
                            label="Correo" 
                            type="email" 
                            placeholder="example@example.cl"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange} 
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 4}}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder="ingresar contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange} 
                        />
                    </Grid>
                    <Grid
                        container
                        display={!!errorMessage ? '' : 'none'}
                        sx={{mb: 2, mt: 1}}
                    >
                        <Grid 
                            item 
                            xs={12}
                            >
                                <Alert severity="error">{errorMessage}</Alert>
                        </Grid>  
                    </Grid> 
                    <Grid 
                        container
                        spacing={2}
                        sx={{mb: 2, mt: 1}}
                    > 
                        <Grid item xs={12} sm={6}>
                            <Button 
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isAuthenticated}
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSingIn}
                                disabled={isAuthenticated}
                            >
                                <Google />
                                <Typography sx={{ml: 1}}>
                                    Google
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="end"
                    >
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/register"
                            onClick={cleanError}
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
                
    )
}
