import React from 'react'
import { Link } from 'react-router-dom'



const FeaturedItems = ({products}) => {
    console.log(products)
  return (
    <div className='w-[90vw] mx-auto px-5 py-10'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-10'>Featured Items</h1>
        <div className='grid grid-cols-4 gap-7'>
            {
                products && products.map((item, idx) => ( 
                    <Link to={`/product/${item._id}`} state={{ item, idx }} key={item._id || idx}>
                        <div key={idx} className='flex flex-col gap-2 border-1 p-2 border-zinc-200 rounded-xl pb-6 cursor-pointer'>
                            <img className='rounded-xl cover h-60' src={item.productImages[0]} alt="" />
                            <div>
                                <h2 className='text-zinc-800'>{item.productTitle}</h2>
                                <p className='text-sm text-slate-600'>{item.pricePerDay}₹</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default FeaturedItems