import React, { useEffect, useState } from 'react'
import Btn from '../components/profilepage/Btn'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import axios from 'axios'
import { toast } from 'react-toastify'

const LenderRequests = () => {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  console.log(items)

  // 🔹 FETCH RENTALS
  const fetchRentals = async () => {
    try {
      const res = await axios.get(
        'http://localhost:4000/api/rentals/lender',
        { withCredentials: true }
      )

      setItems(res.data.rentals || [])
    } catch (err) {
      console.error('Failed to fetch rentals', err)
      toast.error('Failed to load requests')
    }
  }

  useEffect(() => {
    fetchRentals()
  }, [])

  // 🔹 ACCEPT
  const handleAccept = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/rentals/${id}/accept`,
        {},
        { withCredentials: true }
      )

      toast.success('Rental Accepted ✅')
      fetchRentals()
    } catch (err) {
      toast.error('Error accepting rental')
    }
  }

  // 🔹 REJECT
  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/rentals/${id}/reject`,
        {},
        { withCredentials: true }
      )

      toast.error('Rental Rejected ❌')
      fetchRentals()
    } catch (err) {
      toast.error('Error rejecting rental')
    }
  }

  return (
    <div className='w-full mx-auto min-h-screen p-5 mt-15 bg-zinc-100 px-30'>
      
      {/* HEADER */}
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>
          Rental Requests
        </h1>

        <div className='flex gap-4'>
          <Link to={'/profile-lender'}>
            <Btn icon={<IoMdArrowRoundBack />}>
              Go Previous
            </Btn>
          </Link>
        </div>
      </div>

      {/* LIST */}
      <div className='grid grid-cols-3 gap-4'>
        {items.length === 0 ? (
          <p>No rental requests found.</p>
        ) : (
          items.map((item, idx) => (
            <div
              key={item._id || idx}
              className='flex flex-col gap-2 bg-white border border-zinc-300 px-4 py-5 rounded-2xl'
            >
              {/* PRODUCT */}
              <h2 className='text-lg font-semibold'>
                {item.productId?.productTitle}
              </h2>

              {/* RENTER */}
              <p className='text-sm text-slate-600'>
                Renter: {item.renterId?.fullname}
              </p>

              {/* DATES */}
              <p className='text-sm text-slate-600'>
                {new Date(item.startDate).toDateString()} →{' '}
                {new Date(item.endDate).toDateString()}
              </p>

              {/* STATUS */}
              <p
                className={`text-sm font-semibold ${
                  item.status === 'requested'
                    ? 'text-yellow-600'
                    : item.status === 'active'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.status}
              </p>

              {/* BUTTONS */}
              {item.status === 'requested' && (
                <div className='flex gap-3 mt-2'>
                  <button
                    onClick={() => handleAccept(item._id)}
                    className='bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded-lg'
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(item._id)}
                    className='bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-lg'
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default LenderRequests