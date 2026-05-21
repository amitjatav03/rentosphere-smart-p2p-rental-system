import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import Btn from './Btn'
import { FaHeart } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const ProfileCard = () => {
    const [authUser, setAuthUser] = useAuth();
    let { fullname, username } = authUser.user;
    
    const fullnameArr = fullname.split(' ');
    const fname = fullnameArr[0][0];
    const lname = fullnameArr[fullnameArr.length-1][0];

  return (
    <div className='w-full rounded-lg flex bg-white justify-between items-center p-7'>
        <div className='flex items-center gap-7'>
            <img className='rounded-full w-42 h-42' src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${fname + lname}`} alt="profile" />
            <div className='flex flex-col gap-1'>
                <h1 className='text-4xl font-bold text-zinc-700'>{fullname}</h1>
                <h2 className='font-semibold text-zinc-400'>{username}</h2>
                <div className='flex gap-2'>
                    <div className='text-xs text-blue-900 py-1 font-semibold px-2 rounded-full bg-blue-300'>
                        Renter
                    </div>
                    <div className='text-xs text-green-900 py-1 cursor-pointer font-semibold px-2 rounded-full bg-green-300'>
                        <Link to={'/profile-lender'}>
                            Switch to Lender
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <Btn icon={<MdModeEdit />}>
                Edit Profile
            </Btn>
            <Btn icon={<FaHeart />} color={'bg-red-600'} hovercolor={'hover:bg-red-500'}>
                Favorites
            </Btn>

        </div>
    </div>
  )
}

export default ProfileCard