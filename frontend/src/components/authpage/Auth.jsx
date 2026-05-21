import React from 'react'
import { Link } from 'react-router-dom'

const Auth = ({children, data}) => {
  return (
    <div className='w-full flex justify-center items-center mt-24'>
        <div className='w-[82vw] h-[82vh] flex bg-slate-100 rounded-2xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='h-full w-[40%] flex flex-col gap-5 justify-between bg-sky-900 text-white px-10 py-8'>
                <div className='flex flex-col gap-5'>
                    <h2 className='text-lg font-semibold uppercase tracking-widest'>
                        RentoSphere
                    </h2>
                    <div>
                        <h1 className='text-3xl font-semibold'>
                            {data.title}
                        </h1>
                        <p className='text-md text-slate-200'>
                            {data.desc}
                        </p>
                    </div>
                    <img className='w-[30vw] h-[36vh] object-cover rounded-2xl' src={data.img} alt="" />
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='text-slate-200 text-sm'>
                        {data.btmline}
                    </p>
                    <div className='flex justify-around w-[80%]'>
                        <Link className='border-1 text-sm border-slate-400 px-4 py-2 rounded-full'>{data["links"][0]}</Link>
                        <Link className='border-1 text-sm border-slate-400 px-4 py-2 rounded-full'>{data["links"][1]}</Link>
                        <Link className='border-1 text-sm border-slate-400 px-4 py-2 rounded-full'>{data["links"][2]}</Link>
                    </div>
                </div>
            </div>
            <div className='h-full w-[60%] flex justify-center items-center'>
                <div className='w-[90%] h-[90%] rounded-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] bg-white px-18 py-10 flex flex-col gap-6 justify-between'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth