import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import Btn from '../Btn'
import { useAuth } from '../../../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const ProfileCardLender = () => {

    const [authUser] = useAuth();

    const user = authUser?.user || {};

    const fullname = user?.fullname || "User";
    const username = user?.username || "username";

    // Avatar Initials
    const fullnameArr = fullname.split(' ');

    const fname = fullnameArr?.[0]?.[0] || '';
    const lname =
        fullnameArr?.[fullnameArr.length - 1]?.[0] || '';

    return (

        <div className='w-full rounded-2xl flex justify-between items-center bg-white p-7 shadow-lg'>

            {/* LEFT SECTION */}
            <div className='flex items-center gap-7'>

                {/* Avatar */}
                <img
                    className='rounded-full w-40 h-40 object-cover border border-zinc-300'
                    src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${fname + lname}`}
                    alt="profile"
                />

                {/* User Info */}
                <div className='flex flex-col gap-2'>

                    <h1 className='text-4xl font-bold text-zinc-700'>
                        {fullname}
                    </h1>

                    <h2 className='font-semibold text-zinc-400 text-lg'>
                        @{username}
                    </h2>

                    {/* Role Tags */}
                    <div className='flex gap-2 mt-1'>

                        <div className='text-xs text-cyan-900 py-1 font-semibold px-3 rounded-full bg-cyan-300'>
                            Lender
                        </div>

                        <Link to={'/profile-renter'}>

                            <div className='text-xs text-orange-900 py-1 cursor-pointer font-semibold px-3 rounded-full bg-orange-300 hover:bg-orange-400 transition-all duration-200'>
                                Switch to Renter
                            </div>

                        </Link>

                    </div>

                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className='flex flex-col gap-3'>

                <button className='bg-blue-700 hover:bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer'>

                    <MdModeEdit size={18} />

                    Edit Profile

                </button>

                <Link to={'/create-product'}>

                    <Btn
                        color={'bg-zinc-800'}
                        hovercolor={'hover:bg-zinc-700'}
                    >
                        + Add New Product
                    </Btn>

                </Link>

            </div>

        </div>
    )
}

export default ProfileCardLender