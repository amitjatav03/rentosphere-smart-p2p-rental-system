import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { MdEventAvailable } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa'
import { CiStar } from 'react-icons/ci'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { AiOutlineMessage } from 'react-icons/ai'

import Btn from '../profilepage/Btn'
import { useAuth } from '../../contexts/AuthProvider'

const ProductInfo = () => {

    const { id } = useParams();

    const [authUser] = useAuth();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [rentInfo, setRentInfo] = useState({
        startDate: '',
        endDate: '',
        pickupLocation: ''
    });

    const [totalCost, setTotalCost] = useState(0);

    // ================= FETCH PRODUCT =================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:4000/api/product/get-product/${id}`
                );

                const productData = res.data.product;

                setProduct(productData);

                setRentInfo(prev => ({
                    ...prev,
                    pickupLocation: productData.location || ''
                }));

            } catch (error) {

                console.log(error);

                toast.error("Failed to fetch product");

            } finally {

                setLoading(false);
            }
        }

        fetchProduct();

    }, [id]);

    // ================= TOTAL COST =================

    useEffect(() => {

        if (!rentInfo.startDate || !rentInfo.endDate || !product) {
            setTotalCost(0);
            return;
        }

        const start = new Date(rentInfo.startDate);
        const end = new Date(rentInfo.endDate);

        const diffTime = end - start;

        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (days > 0) {
            setTotalCost(days * product.pricePerDay);
        } else {
            setTotalCost(0);
        }

    }, [rentInfo, product]);

    // ================= INPUT HANDLER =================

    const handleChange = (e) => {

        setRentInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    // ================= CREATE RENTAL =================

    const createRental = async () => {

        try {

            if (!rentInfo.startDate || !rentInfo.endDate) {
                return toast.error("Please select rental dates");
            }

            await axios.post(
                "http://localhost:4000/api/rentals",
                {
                    productId: product._id,
                    ownerId: product.owner._id,
                    startDate: rentInfo.startDate,
                    endDate: rentInfo.endDate,
                    deliveryMethod: "pickup"
                },
                {
                    withCredentials: true
                }
            );

            toast.success("Rental Request Sent 🎉");

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create rental"
            );
        }
    }

    // ================= LOADING =================

    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center text-2xl'>
                Loading...
            </div>
        )
    }

    // ================= SAFETY =================

    if (!product) {
        return (
            <div className='w-full h-screen flex justify-center items-center text-2xl'>
                Product not found
            </div>
        )
    }

    // ================= OWNER INITIALS =================

    const ownerName = product?.owner?.fullname || '';

    const names = ownerName.split(' ');

    const initials =
        (names[0]?.[0] || '') +
        (names[names.length - 1]?.[0] || '');

    return (

        <div className='w-full min-h-screen flex gap-10 mt-20 px-20'>

            {/* LEFT */}

            <div className='w-1/2 border border-slate-200 rounded-2xl p-3'>

                <div className='w-full h-[500px] bg-slate-100 rounded-2xl overflow-hidden'>

                    <img
                        className='w-full h-full object-cover'
                        src={product.productImages?.[0]}
                        alt="product"
                    />

                </div>

                <div className='grid grid-cols-3 gap-3 mt-3'>

                    {
                        product.productImages?.slice(1, 4).map((img, idx) => (

                            <div
                                key={idx}
                                className='h-44 rounded-xl overflow-hidden'
                            >

                                <img
                                    className='w-full h-full object-cover'
                                    src={img}
                                    alt=""
                                />

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* RIGHT */}

            <div className='w-1/2 flex flex-col justify-between'>

                <div className='flex flex-col gap-5'>

                    <div>

                        <h1 className='text-5xl font-bold text-slate-900'>
                            {product.productTitle}
                        </h1>

                        <p className='text-slate-600 mt-3'>
                            {product.description}
                        </p>

                    </div>

                    {/* AVAILABLE */}

                    <div>

                        <span className='flex gap-2 items-center bg-green-700 text-green-100 text-xs px-3 py-2 rounded-md w-fit'>

                            <MdEventAvailable />

                            Available

                        </span>

                    </div>

                    {/* PRICE */}

                    <div>

                        <span className='text-5xl font-semibold'>
                            ₹{product.pricePerDay}
                        </span>

                        <span className='text-xl'>
                            {" "}per day
                        </span>

                        <span className='text-slate-500 ml-2'>
                            • ₹{product.pricePerDay * 7} per week
                        </span>

                    </div>

                    {/* DATES */}

                    <div className='flex gap-4'>

                        <div className='w-full flex flex-col gap-2'>

                            <label className='font-medium'>
                                Start Date
                            </label>

                            <input
                                type="date"
                                name='startDate'
                                onChange={handleChange}
                                className='border border-slate-300 px-4 py-3 rounded-md'
                            />

                        </div>

                        <div className='w-full flex flex-col gap-2'>

                            <label className='font-medium'>
                                End Date
                            </label>

                            <input
                                type="date"
                                name='endDate'
                                onChange={handleChange}
                                className='border border-slate-300 px-4 py-3 rounded-md'
                            />

                        </div>

                    </div>

                    {/* LOCATION */}

                    <div className='flex flex-col gap-2'>

                        <label className='font-medium'>
                            Pickup Location
                        </label>

                        <input
                            type="text"
                            name='pickupLocation'
                            value={rentInfo.pickupLocation}
                            onChange={handleChange}
                            className='border border-slate-300 px-4 py-3 rounded-md'
                        />

                    </div>

                    {/* TOTAL */}

                    <div className='text-2xl font-semibold'>

                        Total Rental Cost:
                        <span className='text-green-800'>
                            {" "}₹{totalCost}
                        </span>

                    </div>

                    {/* BUTTONS */}

                    <div className='flex gap-4'>

                        <button
                            onClick={createRental}
                            className='bg-slate-800 hover:bg-slate-700 transition-all text-white px-6 py-4 rounded-lg font-medium cursor-pointer'
                        >
                            Reserve Now
                        </button>

                        <button className='border-2 border-slate-700 rounded-lg px-5 py-4 flex items-center gap-2 font-medium'>

                            <FaRegHeart />

                            Save

                        </button>

                    </div>

                </div>

                {/* OWNER CARD */}

                <div className='border border-slate-300 rounded-xl p-5 mt-10 flex justify-between items-center'>

                    <div className='flex items-center gap-4'>

                        <img
                            className='w-20 h-20 rounded-full'
                            src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${initials}`}
                            alt=""
                        />

                        <div>

                            <div className='flex gap-2 items-center'>

                                <h2 className='font-semibold text-lg'>
                                    {product.owner?.fullname}
                                </h2>

                                <span className='bg-slate-200 text-xs px-2 py-1 rounded-lg'>
                                    Top Lender
                                </span>

                            </div>

                            <div className='flex gap-3 mt-3'>

                                <a
                                    href={`https://wa.me/91${product.owner?.phone}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >

                                    <Btn
                                        color={'bg-green-600'}
                                        hovercolor={'hover:bg-green-500'}
                                        icon={<IoLogoWhatsapp />}
                                    >
                                        Contact
                                    </Btn>

                                </a>

                                <Btn icon={<AiOutlineMessage />}>
                                    Message
                                </Btn>

                            </div>

                        </div>

                    </div>

                    <div className='flex items-center gap-2 text-sm'>

                        <CiStar />

                        4.9 • 312 rentals

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductInfo