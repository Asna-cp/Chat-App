import React from 'react';
import './App.css';
import "./styles/style.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import SignUp from './components/authentication/SignUp';
// import Chatoftheday from './pages/Chatoftheday';
import ChatProvider from "./context/ChatProvider";

function App() {
  return (
  <BrowserRouter>
  <ChatProvider>
  <Routes>
    {/* <Route path='/register' element={<Register/>} /> */}
    <Route path='/' element={<Home/>} />
    <Route path='/chats' element={<Chat/>} />
    <Route path='/signup' element={<SignUp/>} />
    {/* <Route path='/day' element={<Chatoftheday/>} /> */}

  </Routes>
  </ChatProvider>
  </BrowserRouter>
  );
}

export default App;
