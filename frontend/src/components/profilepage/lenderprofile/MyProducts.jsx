import React from 'react'
import Btn from '../Btn'
import { Link } from 'react-router-dom'
import { AiOutlineProduct } from 'react-icons/ai'
import { RiNotification3Fill } from 'react-icons/ri'

const MyProducts = ({ products }) => {

    return (
        <div className='w-full mx-auto p-5 bg-white mt-10 rounded-2xl shadow-2xl px-10'>

            {/* Header */}
            <div className='flex justify-between items-center'>

                <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>
                    My Products
                </h1>

                <div className='flex gap-4'>

                    <Link to={'/my-products'}>
                        <Btn
                            icon={<AiOutlineProduct />}
                            color={'bg-green-600'}
                            hovercolor={'hover:bg-green-500'}
                        >
                            Browse All Products
                        </Btn>
                    </Link>

                    <Link to={'/lender-requests'}>
                        <Btn
                            icon={<RiNotification3Fill />}
                            color={'bg-pink-600'}
                            hovercolor={'hover:bg-pink-500'}
                        >
                            Rental Requests
                        </Btn>
                    </Link>

                </div>

            </div>

            {/* Products Grid */}
            {
                products?.length === 0 ? (

                    <div className='w-full flex flex-col items-center justify-center py-16'>

                        <h2 className='text-2xl font-semibold text-zinc-700'>
                            No Products Listed Yet
                        </h2>

                        <p className='text-zinc-500 mt-2'>
                            Start listing products to earn money.
                        </p>

                    </div>

                ) : (

                    <div className='grid grid-cols-4 gap-4'>

                        {
                            products?.slice(0, 8).map((item) => (

                                <Link
                                    key={item._id}
                                    to={`/product/${item._id}`}
                                >

                                    <div className='group flex flex-col gap-2 bg-white border border-zinc-300 px-4 pt-4 pb-7 rounded-2xl cursor-pointer hover:shadow-lg transition-all duration-200'>

                                        {/* Product Image */}
                                        <div className='rounded-2xl overflow-hidden'>

                                            <img
                                                className='group-hover:scale-105 transition-all ease-linear duration-200 h-52 w-full object-cover'
                                                src={item?.productImages?.[0]}
                                                alt={item?.productTitle}
                                            />

                                        </div>

                                        {/* Product Details */}
                                        <div>

                                            <h2 className='text-zinc-800 font-semibold line-clamp-1'>
                                                {item?.productTitle}
                                            </h2>

                                            <p className='text-sm text-slate-600'>
                                                ₹{item?.pricePerDay}/day
                                            </p>

                                            <p className='text-sm text-zinc-500 mt-1'>
                                                {item?.category}
                                            </p>

                                            <p className='text-sm text-zinc-500'>
                                                {item?.location}
                                            </p>

                                            {/* Status */}
                                            <div className='mt-3'>

                                                <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold'>
                                                    Active
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))
                        }

                    </div>

                )
            }

        </div>
    )
}

export default MyProducts