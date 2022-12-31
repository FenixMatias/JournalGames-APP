import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalGamesPage } from '../pages';

export const JournalGamesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<JournalGamesPage />} />
            <Route path="/*" element={ <Navigate to="/" />} />
        </Routes>
    )
}