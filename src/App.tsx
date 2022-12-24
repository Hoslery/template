import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/UI/Footer/Footer';
import Header from './components/UI/Header/Header';
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
