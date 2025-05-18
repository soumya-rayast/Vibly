import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Notification from './pages/Notification'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import { Toaster } from 'react-hot-toast';
import PageLoader from './Components/pageLoader'
import useAuthUser from './hooks/useAuthUser'

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />
  return (
    <div className='h-screen' data-theme='night'>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (<HomePage />) : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />
        <Route path='/' element={!isAuthenticated ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={'/'} />} />
        <Route path='/login' element={isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? '/' :'/onboarding'} />} />
        <Route path='/notifications' element={isAuthenticated ? <Notification /> : <Navigate to={'/login'} />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to={'/login'} />} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path='/onboarding' element={isAuthenticated ? (
          !isOnboarded ? (
            <OnboardingPage />
          ) : (<Navigate to={'/'} />)
        ) : (
          <Navigate to={'/login'} />
        )} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App