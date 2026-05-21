import React from 'react'
import { CiShop } from 'react-icons/ci';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdSupportAgent } from 'react-icons/md';
import { RiSecurePaymentLine } from 'react-icons/ri';

const works = [
    {
        icon: <RiSecurePaymentLine />,
        title: "Secure Payments",
        desc: "Our platform ensures secure and reliable payment processing."
    },
    {
        icon: <HiOutlineUsers />,
        title: "Verified Users",
        desc: "All users are verified to ensure a safe and trustworthy community."
    },
    {
        icon: <MdSupportAgent />,
        title: "24/7 Support",
        desc: "Our support team is available around the clock to assist you."
    },
    {
        icon: <CiShop />,
        title: "Flexible Rentals",
        desc: "Rent items for the duration that suits your needs."
    }
]

const WhyChooseUs = () => {
  return (
    <div className='w-[90vw] mx-auto px-5 py-10'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-10'>Why Choose Us</h1>
        <div className='grid grid-cols-4 gap-4'>
            {
                works.map((work, idx) => {
                    return <div key={idx} className='border-1 border-zinc-300 rounded-xl flex justify-center items-center flex-col py-20 gap-6'>
                        <div className='text-5xl text-slate-600'>
                            {work.icon}
                        </div>
                        <div className='text-center flex flex-col gap-2'>
                            <h2 className='text-2xl text-zinc-800 font-semibold'>{work.title}</h2>
                            <p className='text-lg font-regular tracking-tight text-slate-500 px-14'>{work.desc}</p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default WhyChooseUs