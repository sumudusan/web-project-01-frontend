import React from 'react'
import HomePage from './Components/home'
import { BrowserRouter, Routes , Route } from 'react-router'
import LoginPage from './pages/loginPage'

export default function App(){

  return(
  <div>
    <BrowserRouter>
     <Routes path="/*">
      <Route path='/login' element={<LoginPage/>}/>
     </Routes>
    </BrowserRouter>
    <HomePage/>
  </div>
  )
}