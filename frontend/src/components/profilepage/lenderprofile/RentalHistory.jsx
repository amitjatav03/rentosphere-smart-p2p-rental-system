import React from 'react'

const RentalHistory = ({ rentals }) => {

    return (

        <div className='w-[70%] mx-auto p-5 bg-white px-10 rounded-2xl shadow-lg'>

            {/* Heading */}
            <h1 className='text-3xl font-bold font-[gilroy-bold] my-7'>
                Rental History
            </h1>

            {/* Empty State */}
            {
                rentals?.length === 0 ? (

                    <div className='w-full flex justify-center items-center py-16'>

                        <p className='text-zinc-500 text-lg'>
                            No rental history available.
                        </p>

                    </div>

                ) : (

                    <div className='w-full overflow-hidden rounded-xl border border-zinc-200'>

                        <div className="w-full overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                {/* TABLE HEAD */}
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">

                                    <tr>

                                        <th className="px-6 py-4">
                                            ITEM NAME
                                        </th>

                                        <th className="px-6 py-4">
                                            RENTER
                                        </th>

                                        <th className="px-6 py-4">
                                            DURATION
                                        </th>

                                        <th className="px-6 py-4">
                                            STATUS
                                        </th>

                                        <th className="px-6 py-4">
                                            EARNINGS
                                        </th>

                                    </tr>

                                </thead>

                                {/* TABLE BODY */}
                                <tbody>

                                    {
                                        rentals?.slice(0, 6).map((rental) => (

                                            <tr
                                                key={rental?._id}
                                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-zinc-50 transition-all duration-150"
                                            >

                                                {/* PRODUCT */}
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
                                                >
                                                    {
                                                        rental?.productId?.productTitle ||
                                                        'Product'
                                                    }
                                                </th>

                                                {/* RENTER */}
                                                <td className="px-6 py-4">

                                                    {
                                                        rental?.renterId?.fullname ||
                                                        'Renter'
                                                    }

                                                </td>

                                                {/* DURATION */}
                                                <td className="px-6 py-4">

                                                    {
                                                        new Date(
                                                            rental?.startDate
                                                        ).toLocaleDateString()
                                                    }

                                                    {" - "}

                                                    {
                                                        new Date(
                                                            rental?.endDate
                                                        ).toLocaleDateString()
                                                    }

                                                </td>

                                                {/* STATUS */}
                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                                        
                                                        ${
                                                            rental?.status === 'active'
                                                            ? 'bg-green-100 text-green-700'

                                                            : rental?.status === 'completed'
                                                            ? 'bg-blue-100 text-blue-700'

                                                            : rental?.status === 'requested'
                                                            ? 'bg-yellow-100 text-yellow-700'

                                                            : 'bg-red-100 text-red-700'
                                                        }
                                                        
                                                        `}
                                                    >

                                                        {
                                                            rental?.status
                                                        }

                                                    </span>

                                                </td>

                                                {/* EARNINGS */}
                                                <td className="px-6 py-4 font-semibold text-green-700">

                                                    ₹{
                                                        rental?.totalCost
                                                    }

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                )
            }

        </div>

    )
}

export default RentalHistory