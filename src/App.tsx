import { useState } from 'react'
import LoginPage from './components/login'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Sidebar from './components/SideBar/SideBar'
import routes from './components/Routes/AuthorisedRouteConfig'
import Auth from './services/AuthService/Auth'
import { Toaster } from 'react-hot-toast' // <- Import this


function ProtectedLayout() {
  const isAuthenticated = Auth.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
        <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Protected Layout for authenticated users */}
        <Route element={<ProtectedLayout />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
