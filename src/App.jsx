import React from 'react'
import HomePage from './Components/home'
import { BrowserRouter, Routes , Route } from 'react-router'
import LoginPage from '../src/pages/home/loginPage'
import SignInPage from './pages/signInPage'
import AdminHomePage from './pages/adminHomePage'
import { Toaster } from 'react-hot-toast'

export default function App(){

  return(
  <div>
    <BrowserRouter>
    <Toaster/>
     <Routes path="/*">
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignInPage/>}/>
      <Route path='/admin/*' element={<AdminHomePage/>}/> 
      <Route path='/*' element={<HomePage/>}/>
     </Routes>
    </BrowserRouter>
  </div>
  )
}