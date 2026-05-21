import React, { useEffect, useState } from 'react'
import Btn from '../components/profilepage/Btn'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import axios from 'axios'
import { IoTrashBin } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthProvider'

const MyAllProducts = () => {
  const [items, setItems] = useState([])
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useAuth();

  const navigateToProduct = (e) => {
    console.log(e)
  }

  /*
  
  useEffect(() => {
    
    return () => {
    
      }

  }, [elem1, button])
  */


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/product/get-owner-products', { withCredentials: true })

        const products = res.data.products
        console.log(res.data.products)
        // if backend returns data in res.data
        setItems(products || [])
        console.log('products', products)
      } catch (err) {
        console.error('Failed to fetch products', err)
      }
    }

    fetchProducts()
  }, [])

  
  const deleteProduct = async (productid) => {
      const deleteurl = `http://localhost:4000/api/product/delete-product/${productid}`
      console.log("clicked")
      console.log(deleteurl)

    try {
        const res = await axios.delete(deleteurl, { withCredentials: true })

        const products = res.data.productsdata
        console.log(res.data.productsdata)
        // if backend returns data in res.data
        setItems(products || [])
        console.log('products', products)
        
        toast.error('Product Deleted 🗑️')
        navigate('/my-products')

        fetchProducts();

      } catch (err) {
        console.error('Error in removing product', err)
      }
  }

  return (
    <div className='w-full mx-auto min-h-screen p-5 mt-15 bg-zinc-100 px-30'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>My Products</h1>
        <div className='flex gap-4'>
          <Link to={'/create-product'}>
            <Btn color={'bg-zinc-800'} hovercolor={'hover:bg-zinc-700'}>
              + Add New Product
            </Btn>
          </Link>
          <Link to={'/profile-lender'}>
            <Btn icon={<IoMdArrowRoundBack />}>
              Go Previous
            </Btn>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {items.length === 0 ? (
          <p>No products found.</p>
        ) : (
          items.map((item, idx) => (
            <div key={item._id || idx} className='group flex flex-col gap-2 bg-white border border-zinc-300 px-4 pt-4 pb-7 rounded-2xl'>
              <div className='rounded-2xl overflow-hidden'>
                <Link to={`/product/${item._id}`} state={{ item, idx }}>
                    <img className='hover:scale-105 transition-all h-52 w-full ease-linear duration-200 cursor-pointer' src={item.productImages[0] || item.imageUrl || ''} alt={item.name || ''} />
                </Link>
              </div>
              <div>
                <div className='flex justify-between'>
                    <h2 className='text-zinc-800'>{item.productTitle}</h2>
                    <button onClick={() => deleteProduct(item._id)} className='bg-red-600 hover:bg-red-500 text-white rounded-lg w-8 h-8 flex justify-center items-center relative z-20 cursor-pointer'><IoTrashBin /></button>
                </div>
                <p className='text-sm text-slate-600'>{item.pricePerDay}₹ per day</p>
                <p className={`text-sm mt-2 font-semibold ${item.status === 'available' ? 'text-green-700' : 'text-slate-600'}`}>{item.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAllProducts