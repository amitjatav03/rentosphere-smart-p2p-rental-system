import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'
import { RiFacebookCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-[75vh]'>
        <div className='w-full h-[75%] flex flex-col justify-center items-center gap-6'>
            <h1 className='text-6xl font-[gilroy] font-bold'>Have something to lend?</h1>
            <button className='text-white bg-slate-700 cursor-pointer px-10 py-4 rounded-full text-lg'>
                Become Lender
            </button>
        </div>
        <div className='w-[70%] h-[30%] mx-auto flex flex-col gap-2 justify-between py-4'>
            <div className='flex justify-around text-slate-700'>
                <Link>About</Link>
                <Link>Contact</Link>
                <Link>Terms of Service</Link>
                <Link>Privacy Policy</Link>
            </div>
            <div className='flex text-zinc-800 justify-center gap-5 text-2xl'>
                <Link><FiTwitter /></Link>
                <Link><FaInstagram /></Link>
                <Link><RiFacebookCircleLine /></Link>
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-center text-zinc-700'>
                    &copy; 2025 RentalHive. All rights reserved.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer