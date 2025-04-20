import { useState } from 'react'
import LoginPage from './components/login'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import PriveateRoute from './components/Routes/PriveateRoute';
import Dashboard from './components/DashBoard/Dashboard';
import Sidebar from './components/SideBar/SideBar';
import routes from './components/Routes/MenuItem';


function AppRoutes() {
  const routing = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    ...routes,
  ]);
  return routing;
}


function App() {
  return (
    <>
      <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <AppRoutes />
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
