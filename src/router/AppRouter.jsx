import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { useCheckAuth } from '../hooks';
import { JournalGamesRoutes } from '../journalGames/routes';
import { CheckingAuth } from '../ui';


export const AppRouter = () => {

    const status = useCheckAuth();

    if(status === 'checking') {

        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                status === 'authenticated'
                ? 
                    <Route path="/*" element={ <JournalGamesRoutes /> } />
                :
                    <Route path="/auth/*" element={ <AuthRoutes /> } />
            }
            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            {/*Login y Registro*/}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}
            {/*JournalGames*/}
            {/* <Route path="/*" element={ <JournalGamesRoutes /> } /> */}
        </Routes>
    )
}
