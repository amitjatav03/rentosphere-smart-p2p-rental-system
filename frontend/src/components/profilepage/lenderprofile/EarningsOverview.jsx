import React from 'react'
import TotalCards from './TotalCards'

const EarningsOverview = ({ summary }) => {

  console.log(summary)

    return (

        <div className='w-[30%] mx-auto p-5 bg-white px-10 rounded-2xl shadow-lg'>

            {/* Heading */}
            <h1 className='text-2xl font-bold font-[gilroy-bold] my-7'>
                Earnings Overview
            </h1>

            {/* Cards */}
            <div className='flex flex-col gap-4'>

                <TotalCards
                    title={'Total Earnings'}
                    total={`₹${summary?.totalEarnings || 0}`}
                />

                <TotalCards
                    title={'Total Rentals'}
                    total={summary?.totalRentals || 0}
                />

                <TotalCards
                    title={'Active Rentals'}
                    total={summary?.activeRentals || 0}
                />

            </div>

        </div>

    )
}

export default EarningsOverview