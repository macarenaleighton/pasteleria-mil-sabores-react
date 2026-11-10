import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import App from './App.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { SesionProvider } from './context/SesionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <SesionProvider>
                <CarritoProvider>
                    <App />
                </CarritoProvider>
            </SesionProvider>
        </BrowserRouter>
    </React.StrictMode>
);
