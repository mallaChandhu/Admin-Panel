import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route index element={<Navigate to='/login' />} />
    <Route  path='/login' element={ <App />} />
  </Routes>
  </BrowserRouter>
)
