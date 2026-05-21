import React from 'react'
import { MdOutlineMail, MdPhoneIphone } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { PiGenderNeuterBold } from 'react-icons/pi'

import DetailCard from './DetailCard'
import { useAuth } from '../../contexts/AuthProvider'

const ProfileDetails = () => {

    const [authUser] = useAuth();

    const user = authUser?.user || {};

    return (

        <div className='w-full mx-auto p-5'>

            {/* Heading */}
            <h1 className='text-4xl font-bold font-[gilroy-bold] my-7'>
                Profile Details
            </h1>

            {/* Details Container */}
            <div className='w-full flex justify-between bg-white p-10 px-20 pr-28 rounded-2xl shadow-lg'>

                {/* LEFT SIDE */}
                <div className='flex flex-col items-start gap-6'>

                    <DetailCard
                        icon={<MdOutlineMail size={25} />}
                        heading={'Email'}
                        value={user?.email || 'Not Available'}
                    />

                    <DetailCard
                        icon={<MdPhoneIphone size={25} />}
                        heading={'Phone'}
                        value={user?.phone || 'Not Available'}
                    />

                </div>

                {/* RIGHT SIDE */}
                <div className='flex flex-col items-start gap-6'>

                    <DetailCard
                        icon={<IoHomeOutline size={25} />}
                        heading={'Address'}
                        value={'Bhopal, Madhya Pradesh'}
                    />

                    <DetailCard
                        icon={<PiGenderNeuterBold size={25} />}
                        heading={'Role'}
                        value={'Lender'}
                    />

                </div>

            </div>

        </div>
    )
}

export default ProfileDetails