import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth();

    let fullname, fullnameArr, initials;
    if(authUser) {
        fullname  = authUser.user.fullname;
        fullnameArr = fullname.split(' ');
        initials = [fullnameArr[0][0], fullnameArr[fullnameArr.length-1][0]];
    }



    const logout = async () => {

        await axios.get('http://localhost:4000/api/auth/logout', {
            withCredentials: true
        })
        .then(res => {
            localStorage.removeItem('userdata');
            Cookies.remove("token");
            setAuthUser(null);
            toast.error("Logged Out!!");
            navigate('/');
        })
        .catch(err => {
            alert('Error in Logging out');
            console.log(err);
        })
    } 


    return (
        <div className='px-20 py-4 flex justify-between items-center fixed z-10 w-full bg-white top-0'>
            <h2 className='text-xl font-semibold uppercase tracking-widest'>
                RentoSphere
            </h2>
            <div className='flex gap-32 items-center'>
                <div className='text-zinc-700 flex gap-10'>
                    <Link to={'/'}>home</Link>
                    <Link to={'/product'}>categories</Link>
                    <Link>how it works</Link>
                    <Link>about</Link>
                    <Link>contact</Link>
                </div>
                {
                    (!authUser) ?
                        <div className='flex gap-10 justify-center items-center'>

                            <Link to={'/signup'} className='bg-slate-600 font-semibold text-white px-8 py-4 rounded-full'>sign up</Link>
                            <Link to={'/login'} className='font-semibold'>login</Link>
                        </div>
                        :
                        
                        <div className='group relative w-12 h-12 cursor-pointer'>
                            <img
                                className='w-full h-full rounded-full'
                                src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${initials[0] + initials[1]}`}
                                alt="avatar"
                            />

                            <div className='absolute bottom-0 translate-y-[100%] left-1/2 border border-zinc-400 rounded-lg  px-4 py-2 bg-white flex flex-col gap-3 justify-center items-center scale-0 group-hover:scale-100 origin-top-left transition-all duration-100 ease-linear'>
                                <div className='flex flex-col gap-1 justify-center items-center'>
                                    <Link className='text-sm hover:text-black hover:font-semibold' to={'/profile-renter'}>Profile</Link>
                                    <Link className='text-sm hover:text-black hover:font-semibold'>Settings</Link>
                                </div>
                                <Link className='text-sm bg-red-500 hover:bg-red-600 font-semibold px-3 py-1 rounded-md text-zinc-100' onClick={logout}>Logout</Link>
                            </div>
                        </div>

                }

            </div>
        </div>
    )
}

export default Navbar