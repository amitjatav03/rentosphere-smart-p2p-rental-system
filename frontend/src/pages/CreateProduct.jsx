import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Btn from '../components/profilepage/Btn'
import { toast } from 'react-toastify'
import { IoArrowBackSharp } from 'react-icons/io5'

function CreateProduct() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        productTitle: '',
        description: '',
        pricePerDay: '',
        category: '',
        location: '',
        deliveryAvailable: false,

        image1: '',
        image2: '',
        image3: '',
        image4: ''
    });

    // ================= CHANGE HANDLER =================

    const changeHandler = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // ================= SUBMIT HANDLER =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FRONTEND VALIDATION

        if (
            !formData.productTitle ||
            !formData.description ||
            !formData.pricePerDay ||
            !formData.category ||
            !formData.location ||
            !formData.image1
        ) {
            return toast.error('Please fill all required fields');
        }

        try {

            setLoading(true);

            // remove empty images

            const productImages = [
                formData.image1,
                formData.image2,
                formData.image3,
                formData.image4
            ].filter((img) => img.trim() !== '');

            const productData = {
                productTitle: formData.productTitle,
                description: formData.description,
                pricePerDay: Number(formData.pricePerDay),
                category: formData.category,
                location: formData.location,
                deliveryAvailable: formData.deliveryAvailable,
                productImages
            };

            const res = await axios.post(
                'http://localhost:4000/api/product/create-product',
                productData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success('Product uploaded successfully 🚀');

            navigate('/my-products');

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                'Failed to create product'
            );

        } finally {
            setLoading(false);
        }
    };

    // ================= UI =================

    const inputClass =
        'block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none';

    return (
        <div className='bg-gray-100 min-h-screen py-12 mt-20'>

            <form
                onSubmit={handleSubmit}
                className='max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl'
            >

                {/* HEADER */}

                <div className='flex justify-between items-center mb-8'>

                    <h2 className='text-4xl font-bold text-gray-800'>
                        Create New Product
                    </h2>

                    <Link to='/profile-lender'>
                        <Btn>
                            <IoArrowBackSharp />
                            Go Previous
                        </Btn>
                    </Link>

                </div>

                {/* PRODUCT TITLE */}

                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Product Title *
                    </label>

                    <input
                        type='text'
                        name='productTitle'
                        value={formData.productTitle}
                        onChange={changeHandler}
                        className={inputClass}
                        placeholder='Enter product title'
                    />
                </div>

                {/* DESCRIPTION */}

                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Description *
                    </label>

                    <textarea
                        rows='5'
                        name='description'
                        value={formData.description}
                        onChange={changeHandler}
                        className={inputClass}
                        placeholder='Describe your product'
                    />
                </div>

                {/* PRICE */}

                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Price Per Day (₹) *
                    </label>

                    <input
                        type='number'
                        name='pricePerDay'
                        value={formData.pricePerDay}
                        onChange={changeHandler}
                        className={inputClass}
                        placeholder='Enter daily rental price'
                    />
                </div>

                {/* CATEGORY */}

                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Category *
                    </label>

                    <select
                        name='category'
                        value={formData.category}
                        onChange={changeHandler}
                        className={inputClass}
                    >
                        <option value=''>Select category</option>

                        <option value='Electronics'>Electronics</option>
                        <option value='Gaming'>Gaming</option>
                        <option value='Cameras'>Cameras</option>
                        <option value='Sports'>Sports</option>
                        <option value='Vehicles'>Vehicles</option>
                        <option value='Tools'>Tools</option>
                        <option value='Books'>Books</option>
                        <option value='Fashion'>Fashion</option>
                    </select>
                </div>

                {/* LOCATION */}

                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Pickup Location *
                    </label>

                    <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={changeHandler}
                        className={inputClass}
                        placeholder='Enter pickup location'
                    />
                </div>

                {/* DELIVERY AVAILABLE */}

                <div className='mb-8 flex items-center gap-3'>

                    <input
                        type='checkbox'
                        name='deliveryAvailable'
                        checked={formData.deliveryAvailable}
                        onChange={changeHandler}
                        className='w-5 h-5'
                    />

                    <label className='text-gray-700 font-medium'>
                        Delivery Available
                    </label>

                </div>

                <hr className='mb-8 border-gray-300' />

                {/* IMAGE URLS */}

                <div className='space-y-6'>

                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>
                            Main Image URL *
                        </label>

                        <input
                            type='text'
                            name='image1'
                            value={formData.image1}
                            onChange={changeHandler}
                            className={inputClass}
                            placeholder='Paste image URL'
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>
                            Product Image 2
                        </label>

                        <input
                            type='text'
                            name='image2'
                            value={formData.image2}
                            onChange={changeHandler}
                            className={inputClass}
                            placeholder='Paste image URL'
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>
                            Product Image 3
                        </label>

                        <input
                            type='text'
                            name='image3'
                            value={formData.image3}
                            onChange={changeHandler}
                            className={inputClass}
                            placeholder='Paste image URL'
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700'>
                            Product Image 4
                        </label>

                        <input
                            type='text'
                            name='image4'
                            value={formData.image4}
                            onChange={changeHandler}
                            className={inputClass}
                            placeholder='Paste image URL'
                        />
                    </div>

                </div>

                {/* SUBMIT BUTTON */}

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full mt-10 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-5 py-3 transition-all duration-200 disabled:bg-gray-400'
                >
                    {
                        loading
                            ? 'Uploading Product...'
                            : 'Upload Product'
                    }
                </button>

            </form>

        </div>
    );
}

export default CreateProduct;