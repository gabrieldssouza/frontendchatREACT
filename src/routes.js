import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ListaChats from './pages/ListaChats';
import Login from './pages/Login';
import Chat from './pages/Chat';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chats" element={<ListaChats />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes; 