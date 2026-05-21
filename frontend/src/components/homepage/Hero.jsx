import React from 'react'
import heroBg from '../../assets/images/hero-bg.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='relative w-[90vw] h-[90vh] mx-auto mt-24 flex justify-center items-center flex-col text-2xl text-white'>
        <img className='absolute w-full h-full rounded-2xl object-cover z-[-1]' src={heroBg} alt="" />
        <div className="absolute w-full h-full rounded-2xl top-0 left-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none z-[-1]"></div>

        <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='font-[gilroy] font-bold text-center text-white text-7xl'>Rent Smarter, Save Bigger</h1>
            <h2 className='text-zinc-200 font-extralight'>Lend or rent items hassle-free — anytime, anywhere</h2>

            
            <div className='flex w-[75%]'>
                <form className="w-[75%] h-[20%] mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium  sr-only text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <div>
                            <div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-lg  rounded-lg bg-white outline-none py-5 placeholder:text-zinc-700 text-slate-800" placeholder="Search for items..." required />
                            <button type="submit" className="text-white absolute end-2.5 top-1/2 -translate-y-1/2  font-medium rounded-lg text-lg px-4 py-2 bg-slate-600 cursor-pointer">Search</button>
                        </div>
                        
                        </div>
                    </div>
                </form>
                
                    <button className='bg-zinc-800 border-2 text-lg font-semibold cursor-pointer hover:bg-gray-900 px-10 rounded-lg'>
                        <Link to={'/show-rent-products'}>
                            Explore
                        </Link>
                    </button>

            </div>
            


        </div>
    </div>
  )
}

export default Hero