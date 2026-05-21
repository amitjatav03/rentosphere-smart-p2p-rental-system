import React from 'react'

const DetailCard = ({ icon, heading, value }) => {
  return (
    <div className='flex justify-center items-center gap-4'>
        <div className='text-zinc-700'>
            {icon}
        </div>

        
        <div>
            <h2 className='text-zinc-500 font-semibold'>{heading}</h2>
            <p>{value}</p>
        </div>
    </div>
  )
}

export default DetailCard