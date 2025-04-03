import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';   
import Hub from './components/Hub';
import CTF from './components/CTF';
import Quiz from './components/Quiz';
import Education from './components/Education';
import MCTF from './components/MCTF';
import Leaderboard from './components/Leaderboard';
import Tournament from './components/Tournament';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/home/:dept' element={<Hub />} />
          <Route path='/home/:dept/ctf' element={<CTF />} />
          <Route path='/home/:dept/ctf' element={<CTF />} />
          <Route path='/home/:dept/quiz' element={<Quiz />} />
          <Route path='/home/:dept/mission' element={<MCTF />} />
          <Route path='/home/:dept/leaderboard' element={<Leaderboard />} />
          <Route path='/home/:dept/tournament' element={<Tournament />} />
          <Route path='/home/education' element={<Education />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);