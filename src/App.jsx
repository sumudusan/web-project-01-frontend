import React from 'react'
import HomePage from './Components/home'
import { BrowserRouter, Routes , Route } from 'react-router'
import LoginPage from './pages/loginPage'
import SignInPage from './pages/signInPage'

export default function App(){

  return(
  <div>
    <BrowserRouter>
     <Routes path="/*">
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignInPage/>}/>
     </Routes>
    </BrowserRouter>
  </div>
  )
}