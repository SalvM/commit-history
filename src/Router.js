import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';

import AccessPage from './pages/AccessPage';
import HistoryPage from './pages/HistoryPage';
import React from "react";

export default function AppRouter(props) {
    return (
        <Router>
            <Routes>
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/" element={<AccessPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}