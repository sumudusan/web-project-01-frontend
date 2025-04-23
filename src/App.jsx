import React from 'react'
import HomePage from './Components/home'
import { BrowserRouter, Routes , Route } from 'react-router'
import LoginPage from './pages/loginPage'
import SignInPage from './pages/signInPage'
import AdminHomePage from './pages/adminHomePage'

export default function App(){

  return(
  <div>
    <BrowserRouter>
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