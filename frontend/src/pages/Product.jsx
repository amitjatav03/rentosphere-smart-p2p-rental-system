import React from 'react'
import Navbar from '../components/Navbar'
import ProductInfo from '../components/productpage/ProductInfo'

const Product = () => {
  return (
    <div className='w-full relative'>
        <Navbar />
        <div className='w-[90vw] mx-auto px-5 py-10'>
            <ProductInfo />
        </div>
    </div>
  )
}

export default Product