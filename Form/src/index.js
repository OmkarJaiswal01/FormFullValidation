import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Axios from './Axios';
import Dasboard from './Dasboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<App/>}></Route>
    <Route exact path='/Login' element={<Axios/>}></Route>
    <Route exact path='/Reg' element={<App/>}></Route>
    <Route exact path='/Dasboard' element={<Dasboard/>}></Route>
   </Routes>
   </BrowserRouter>
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
