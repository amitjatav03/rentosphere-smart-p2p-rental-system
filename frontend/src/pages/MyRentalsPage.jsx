import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyRentalsPage = () => {
  const [rentals, setRentals] = React.useState([]);

  const formatDateRange = (startDate, endDate) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  useEffect(() => {
    const fetchRentals = async () => {
      await axios.get(`http://localhost:4000/api/rentals/me`, {
        withCredentials: true
      })
        .then(res => {
          console.log("rentals", res.data.rentals)
          setRentals(res.data.rentals);
        })
        .catch(err => {
          console.log("fetch rentals error", err)
        })
    }

    fetchRentals();
  }, [])

  return (
    <div className='w-[90vw] mx-auto mt-24'>
      <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>My Rentals</h1>

      <div className='rentals-category flex gap-20 text-lg'>
        <div className='rentals-category-item active-btn cursor-pointer'>All</div>
        <div className='rentals-category-item cursor-pointer'>Requested</div>
        <div className='rentals-category-item cursor-pointer'>Active</div>
        <div className='rentals-category-item cursor-pointer'>Completed</div>
      </div>

      <div className='w-full h-[1px] bg-zinc-300 my-4'></div>

      <div className="rentals-container flex flex-wrap gap-4 justify-start items-center w-full">
        {
          rentals.map((rental, idx) => (
            <div className="rental-product flex border-1 border-zinc-300 rounded-lg overflow-hidden w-[30%]">
              <div className="rentals-cont-left w-[40%] ">
                <img className='h-full w-full' src={rental.productId.productImages[0]} alt="" />
              </div>
              <div className="rentals-cont-right w-[60%] px-5 py-6">
                <h2 className='font-semibold text-zinc-800 mb-1'>{rental.productId.productTitle}</h2>
                <p>₹{rental.productId.pricePerDay}/day</p>
                <span className='text-zinc-600 text-sm font-semibold'>{formatDateRange(rental.startDate, rental.endDate)}</span>
                <p className='text-sm'>Delivery: <span className='font-semibold text-blue-800'>{rental.deliveryMethod}</span></p>
                <p className='text-sm'>Status: <span className={`text-blue-600 font-semibold ${rental.status==='active' ? 'text-green-500' : 'text-red-400'}`}>{rental.status}</span></p>
                <p className='mt-2'>Total: <span className='text-green-900 font-semibold'>₹{rental.totalCost}</span></p>
              </div>
            </div>
          ))
        }
      </div>
    </div>


  )
}

export default MyRentalsPage