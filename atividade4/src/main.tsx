import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
