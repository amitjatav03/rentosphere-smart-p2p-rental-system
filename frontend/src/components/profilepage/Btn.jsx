import React from 'react'

const Btn = ({ children, icon, color, hovercolor }) => {
  return (
    <button className={`${color ? color : 'bg-blue-900'} bg-blue-900 text-white rounded-md text-sm font-semibold px-4 py-3 ${hovercolor ? hovercolor : 'hover:bg-blue-950'}  cursor-pointer transition-colors duration-200 ease-in-out flex justify-center items-center gap-2`}>
        <span>
            {icon}
        </span>
        {children}
    </button>
  )
}

export default Btn