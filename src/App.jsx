import React from 'react'
import "./index.css";
import { BrowserRouter, Routes , Route } from 'react-router'
import LoginPage from '../src/pages/home/loginPage'
import SignInPage from './pages/signInPage'
import { Toaster } from 'react-hot-toast'
import AdminHomePage from './pages/home/adminHomePage'
import HomePage from './pages/home/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App(){

  return(
  <div>
    <BrowserRouter>
    <Toaster/>
    <GoogleOAuthProvider clientId='145350919018-knnk471dpja2jk5hsvk4pmc96g5atgeq.apps.googleusercontent.com'>
     <Routes path="/*">
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignInPage/>}/>
      <Route path='/admin/*' element={<AdminHomePage/>}/> 
      <Route path='/*' element={<HomePage/>}/>
     </Routes>
     </GoogleOAuthProvider>
    </BrowserRouter>
  </div>
  )
}