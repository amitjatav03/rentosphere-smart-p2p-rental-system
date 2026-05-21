import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cursor from './components/Cursor'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap/all'
import Product from './pages/Product'
import { ToastContainer } from 'react-toastify'
import RenterProfile from './pages/RenterProfile'
import LenderProfile from './pages/LenderProfile'
import Navbar from './components/Navbar'
import CreateProduct from './pages/CreateProduct'
import MyAllProducts from './pages/MyAllProducts'
import ShowRentProducts from './pages/ShowRentProducts'
import MyRentalsPage from './pages/MyRentalsPage'
import LenderRequests from './pages/LenderRequests'
import ChatPage from './pages/ChatPage'


const App = () => {
  const lenis = useLenis((lenis) => {
    // called every scroll
  })
  
  

  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <div className='font-[golos]'>
      {/* <Cursor /> */}
      <ReactLenis root />

      <ToastContainer position="bottom-right" theme="colored" />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/profile-renter' element={<RenterProfile />} />
        <Route path='/profile-lender' element={<LenderProfile />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/my-products' element={<MyAllProducts />} />
        <Route path='/show-rent-products' element={<ShowRentProducts />} />
        <Route path='/my-rentals' element={<MyRentalsPage />} />
        <Route path='/lender-requests' element={<LenderRequests />} />
        <Route path='/chat/:rentalId' element={<ChatPage />} />
      </Routes>

    </div>
  )
}

export default App