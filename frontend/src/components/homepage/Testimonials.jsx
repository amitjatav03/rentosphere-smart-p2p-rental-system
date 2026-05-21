import React from 'react'

const testimonialData = [
    {
        name: "Sarah M.",
        pic: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        msg: '"RentoSphere has made it so easy to rent out my camera when I am not using it. I have already made a good amount of money."'
    },
    {
        name: "David L.",
        pic: "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        msg: '"I needed a bike for a weekend trip and found the perfect one on RentoSphere. The process was smooth and the bike was in great condition."'
    },
    {
        name: "Emily R.",
        pic: "https://plus.unsplash.com/premium_photo-1668319915476-5cc7717e00f1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        msg: '"I love the flexibility of rental tools instead of buying them. RentoSphere has saved me so much money on projects around the house."'
    }
]

const Testimonials = () => {
  return (
    <div className='w-[90vw] mx-auto px-5 py-10'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-10'>
            Testimonials
        </h1>
        <div className='grid grid-cols-3 gap-15'>
            {
                testimonialData.map((data, idx) => (
                    <div key={idx} className='h-[60vh] w-full flex flex-col gap-4 rounded-lg overflow-hidden'>
                        <img className='h-[75%] w-full object-cover object-top' src={data.pic} alt="" />    
                        <div className='px-1'>
                            <h2 className='text-slate-700'>{data.name}</h2>
                            <p className='text-slate-500 text-sm'>{data.msg}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Testimonials