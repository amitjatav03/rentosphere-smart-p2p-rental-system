import React from 'react'

const TotalCards = ({ title, total }) => {
    return (
        <div className='rounded-xl border-zinc-200 border-1 p-6 flex flex-col gap-1'>
            <h2 className='text-md text-zinc-400 font-semibold'>
                {title}
            </h2>
            <h1 className='text-2xl text-blue-950 font-semibold'>
                {total}
            </h1>
        </div>
    )
}

export default TotalCards