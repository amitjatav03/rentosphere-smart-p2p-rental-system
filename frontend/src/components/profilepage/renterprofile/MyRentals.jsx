import React from 'react'
import Btn from '../../profilepage/Btn'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMessage } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyRentals = ({ rentals = [] }) => {

    const navigate = useNavigate();

    // ================= CHAT =================

    const openChat = (rentalId) => {

        navigate(`/chat/${rentalId}`);
    }

    // ================= PAYMENT =================

    const handlePayment = async (rental) => {

        try {

            // ================= RAZORPAY POPUP =================

            const options = {

                key: "rzp_test_Sr9sPrKwd5tzi0",

                amount: rental.totalCost * 100,

                currency: "INR",

                name: "Rentosphere",

                description: "Rental Payment",

                handler: async function (response) {

                    try {

                        await axios.patch(

                            `http://localhost:4000/api/rentals/${rental._id}/pay`,

                            {
                                paymentId:
                                    response.razorpay_payment_id
                            },

                            {
                                withCredentials: true
                            }
                        );

                        toast.success(
                            "Payment Successful 🎉"
                        );

                        window.location.reload();

                    } catch (error) {

                        console.log(error);

                        toast.error(
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {

                    name: rental.ownerId?.fullname,

                    email: rental.ownerId?.email,

                    contact: rental.ownerId?.phone
                },

                theme: {
                    color: "#2563eb"
                },

                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true
                },
            };

            const razor = new window.Razorpay(options);

            razor.open();

        } catch (error) {

            console.log(error);

            toast.error("Payment failed");
        }
    };

    // ================= STATUS COLORS =================

    const getStatusColor = (status) => {

        switch (status) {

            case "active":
                return "text-green-700";

            case "requested":
                return "text-yellow-700";

            case "accepted":
                return "text-blue-700";

            case "rejected":
                return "text-red-700";

            case "completed":
                return "text-purple-700";

            default:
                return "text-slate-500";
        }
    }

    return (

        <div className='w-full mx-auto p-5'>

            {/* HEADER */}

            <div className='flex w-full justify-between items-center'>

                <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>

                    My Rentals

                </h1>

                <Link to={'/my-rentals'}>

                    <Btn>
                        Browse All Rentals
                    </Btn>

                </Link>

            </div>

            {/* EMPTY */}

            {
                rentals.length === 0 ? (

                    <div className='w-full bg-white rounded-2xl py-20 flex justify-center items-center text-slate-400 shadow-lg'>

                        No rentals found

                    </div>

                ) : (

                    <div className='grid grid-cols-4 gap-4'>

                        {
                            rentals.slice(0, 4).map((item) => (

                                <div
                                    key={item._id}
                                    className='flex flex-col gap-3 bg-white px-4 pt-4 pb-5 rounded-2xl shadow-md hover:shadow-xl transition-all'
                                >

                                    {/* IMAGE */}

                                    <img
                                        className='rounded-2xl h-60 object-cover'
                                        src={
                                            item.productId?.productImages?.[0]
                                        }
                                        alt=""
                                    />

                                    {/* DETAILS */}

                                    <div className='flex flex-col gap-2'>

                                        {/* TITLE */}

                                        <h2 className='text-zinc-800 font-semibold line-clamp-1'>

                                            {item.productId?.productTitle}

                                        </h2>

                                        {/* PRICE */}

                                        <p className='text-sm text-slate-600'>

                                            ₹
                                            {
                                                item.productId?.pricePerDay
                                            }
                                            /day

                                        </p>

                                        {/* OWNER */}

                                        <p className='text-sm text-slate-500'>

                                            Owner:
                                            {" "}
                                            {
                                                item.ownerId?.fullname
                                            }

                                        </p>

                                        {/* STATUS */}

                                        <p className={`text-sm mt-1 font-semibold ${getStatusColor(item.status)}`}>

                                            {item.status.toUpperCase()}

                                        </p>

                                        {/* PAYMENT STATUS */}

                                        <p className='text-xs text-slate-500'>

                                            Payment:
                                            {" "}

                                            <span className={`font-semibold
                                            
                                            ${
                                                item.paymentStatus === "paid"
                                                    ? "text-green-700"
                                                    : "text-orange-600"
                                            }`}>

                                                {
                                                    item.paymentStatus
                                                }

                                            </span>

                                        </p>

                                        {/* DATES */}

                                        <div className='text-xs text-slate-500 mt-1'>

                                            <p>

                                                {
                                                    new Date(item.startDate)
                                                        .toLocaleDateString()
                                                }

                                                {" "} - {" "}

                                                {
                                                    new Date(item.endDate)
                                                        .toLocaleDateString()
                                                }

                                            </p>

                                        </div>

                                        {/* TOTAL */}

                                        <div className='mt-2 text-sm font-semibold text-slate-700'>

                                            Total:
                                            {" "}
                                            ₹{item.totalCost}

                                        </div>

                                        {/* ================= PAY NOW ================= */}

                                        {
                                            item.status === "accepted" &&
                                            item.paymentStatus === "pending" && (

                                                <button
                                                    onClick={() => handlePayment(item)}
                                                    className='mt-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer'
                                                >

                                                    Pay Now ₹{item.totalCost}

                                                </button>
                                            )
                                        }

                                        {/* ACTIVE BADGE */}

                                        {
                                            item.status === "active" &&
                                            item.paymentStatus === "paid" && (

                                                <div className='mt-2 bg-green-100 text-green-700 text-center py-3 rounded-xl font-semibold'>

                                                    Rental Active

                                                </div>
                                            )
                                        }

                                        {/* COMPLETED */}

                                        {
                                            item.status === "completed" && (

                                                <div className='mt-2 bg-purple-100 text-purple-700 text-center py-3 rounded-xl font-semibold'>

                                                    Rental Completed

                                                </div>
                                            )
                                        }

                                        {/* CHAT BUTTON */}

                                        <button
                                            onClick={() => openChat(item._id)}
                                            className='mt-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer'
                                        >

                                            <AiOutlineMessage size={20} />

                                            Message Owner

                                        </button>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    )
}

export default MyRentals