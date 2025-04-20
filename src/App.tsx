import { useState } from 'react'
import LoginPage from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PriveateRoute from './components/Routes/PriveateRoute';
import Dashboard from './components/DashBoard/Dashboard';

function App() {
  return (
    <>
    <Router>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PriveateRoute>
              <Dashboard />
            </PriveateRoute>
          } 
        />
       
      </Routes>
    </Router>
    </>
  )
}

export default App
