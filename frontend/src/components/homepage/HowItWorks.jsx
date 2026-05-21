import React from 'react'
import { CiBoxList } from 'react-icons/ci';
import { FaConnectdevelop, FaRegUser, FaUser } from "react-icons/fa";

const works = [
    {
        icon: <FaRegUser />,
        title: "Sign Up",
        desc: "Create your account in minutes"
    },
    {
        icon: <CiBoxList />,
        title: "List or Rent",
        desc: "List your items for rent or browse items to rent."
    },
    {
        icon: <FaConnectdevelop />,
        title: "Connect",
        desc: "Connect with other users to arrange the rental"
    }
]

const HowItWorks = () => {
  return (
    <div className='w-[90vw] mx-auto px-5 py-10'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-10'>How It Works</h1>
        <div className='grid grid-cols-3 gap-10'>
            {
                works.map((work, idx) => {
                    return <div key={idx} className='border-1 border-zinc-300 rounded-xl flex justify-center items-center flex-col py-20 gap-6'>
                        <div className='text-5xl text-slate-600'>
                            {work.icon}
                        </div>
                        <div className='text-center flex flex-col gap-2'>
                            <h2 className='text-2xl text-zinc-800 font-semibold'>{work.title}</h2>
                            <p className='text-xl font-regular tracking-tight text-slate-500 px-14'>{work.desc}</p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default HowItWorks