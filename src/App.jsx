import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Coin from './Pages/Coin/Coin'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
