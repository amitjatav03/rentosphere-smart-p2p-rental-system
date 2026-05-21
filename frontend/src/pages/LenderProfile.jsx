import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import ProfileDetails from '../components/profilepage/ProfileDetails'
import MyProducts from '../components/profilepage/lenderprofile/MyProducts'
import RentalHistory from '../components/profilepage/lenderprofile/RentalHistory'
import EarningsOverview from '../components/profilepage/lenderprofile/EarningsOverview'
import ProfileCardLender from '../components/profilepage/lenderprofile/ProfileCardLender'

import { AiOutlineMessage } from 'react-icons/ai'

const LenderProfile = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [rentals, setRentals] = useState([]);

    const [summary, setSummary] = useState({});

    // ================= FETCH DATA =================

    useEffect(() => {

        fetchLenderData();

    }, []);

    const fetchLenderData = async () => {

        try {

            const [
                productsRes,
                rentalsRes,
                summaryRes
            ] = await Promise.all([

                axios.get(
                    'http://localhost:4000/api/product/get-owner-products',
                    { withCredentials: true }
                ),

                axios.get(
                    'http://localhost:4000/api/rentals/lender',
                    { withCredentials: true }
                ),

                axios.get(
                    'http://localhost:4000/api/rentals/lender/summary',
                    { withCredentials: true }
                )

            ]);

            setProducts(productsRes.data.products || []);

            setRentals(rentalsRes.data.rentals || []);

            setSummary(summaryRes.data || {});

        }

        catch (error) {

            console.log(error);
        }
    }

    // ================= UNIQUE CHAT USERS =================

    const recentChats = useMemo(() => {

        const uniqueRenters = [];

        const renterMap = new Map();

        rentals.forEach((rental) => {

            if (
                rental.renterId &&
                !renterMap.has(rental.renterId._id)
            ) {

                renterMap.set(rental.renterId._id, true);

                uniqueRenters.push(rental);
            }
        });

        return uniqueRenters;

    }, [rentals]);

    // ================= OPEN CHAT =================

    const openChat = (rentalId) => {

        navigate(`/chat/${rentalId}`);
    }

    return (

        <div className='w-full relative bg-slate-100 min-h-screen'>

            <div className='w-[75vw] mx-auto mt-20 py-7'>

                {/* PROFILE */}

                <ProfileCardLender />

                {/* PRODUCTS */}

                <MyProducts products={products} />

                {/* PROFILE DETAILS */}

                <ProfileDetails />

                {/* RENTAL + EARNINGS */}

                <div className='w-full flex rounded-2xl gap-2 mt-10 overflow-hidden shadow-2xl'>

                    <RentalHistory rentals={rentals} />

                    <EarningsOverview summary={summary} />

                </div>

                {/* ================= MESSAGES SECTION ================= */}

                <div className='w-full bg-white mt-10 rounded-2xl p-7 shadow-xl'>

                    <div className='flex justify-between items-center mb-7'>

                        <div>

                            <h1 className='text-3xl font-bold text-slate-800'>
                                Messages
                            </h1>

                            <p className='text-slate-500 mt-1'>
                                Talk with renters about products and delivery
                            </p>

                        </div>

                        <div className='bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm'>

                            {recentChats.length} Active Chats

                        </div>

                    </div>

                    {
                        recentChats.length === 0 ? (

                            <div className='w-full py-14 flex justify-center items-center text-slate-400'>

                                No conversations yet

                            </div>

                        ) : (

                            <div className='grid grid-cols-2 gap-5'>

                                {
                                    recentChats.map((rental) => {

                                        const renter =
                                            rental.renterId;

                                        const initials =
                                            renter?.fullname
                                                ?.split(' ')
                                                ?.map(word => word[0])
                                                ?.join('')
                                                ?.slice(0, 2);

                                        return (

                                            <div
                                                key={rental._id}
                                                onClick={() => openChat(rental._id)}
                                                className='border border-slate-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition-all cursor-pointer hover:border-blue-400 bg-slate-50'
                                            >

                                                <div className='flex items-center gap-4'>

                                                    <img
                                                        className='w-16 h-16 rounded-full'
                                                        src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${initials}`}
                                                        alt=""
                                                    />

                                                    <div>

                                                        <h2 className='font-semibold text-lg text-slate-800'>
                                                            {renter?.fullname}
                                                        </h2>

                                                        <p className='text-sm text-slate-500'>
                                                            {rental.productId?.productTitle}
                                                        </p>

                                                        <span className={`text-xs mt-2 inline-block px-2 py-1 rounded-md font-medium
                                                        
                                                        ${
                                                            rental.status === 'active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : rental.status === 'requested'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-slate-200 text-slate-700'
                                                        }`}>

                                                            {rental.status}

                                                        </span>

                                                    </div>

                                                </div>

                                                <div className='bg-blue-600 text-white p-3 rounded-xl'>

                                                    <AiOutlineMessage size={22} />

                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default LenderProfile