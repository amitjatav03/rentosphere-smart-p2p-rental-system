import React from 'react'
import Auth from '../components/authpage/Auth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthProvider'
import { toast, ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'

const loginPage = {
    title: "Welcome Back",
    desc: "Manage rentals and listing with a refined distraction free-workspace.",
    img: "https://plus.unsplash.com/premium_photo-1686167993442-ee5eaab0394f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    btmline: "By continuing, you agree to our Terms and Privacy.",
    links: ["Help Center", "Contact", "Privacy"]
}


const Login = () => {

    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            emailOrUsername: '',
            password: '',
            role: ''
        }
    });

    const submitHandler = async (data) => {
        // Determine if input is email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailOrUsername);
        
        const loginData = {
            ...(isEmail ? { email: data.emailOrUsername } : { username: data.emailOrUsername }),
            password: data.password,
            role: data.role
        };

        await axios.post('http://localhost:4000/api/auth/login', loginData, {
            withCredentials: true
        })
        .then(res => {
            
            if(res.data) toast.success("Logged In Successfully"); 

            localStorage.setItem('userdata', JSON.stringify(res.data));
            
            setAuthUser(res.data);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            if(err.response) {
                // alert('Error in Logging in');
                toast.error("Invalid Email/Username or Password")
                console.log(err.response.data);
            }
        })
    }

    return (
        <Auth data={loginPage}>
            <div className='flex flex-col gap-4 '>
                <div>
                    <h1 className='text-2xl font-semibold'>Login to Your Account</h1>
                    <p className='text-slate-500'>Enter your credentials to continue.</p>
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitHandler)}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="emailOrUsername" className='text-slate-900 text-sm font-medium'>Email or Username</label>
                        <input
                            type="text"
                            id='emailOrUsername'
                            placeholder='abc@example.com or username'
                            className={`w-full text-sm bg-white border-1 ${errors.emailOrUsername ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                            {...register('emailOrUsername', {
                                required: 'Email or username is required',
                                validate: (value) => {
                                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                                    const isValidUsername = /^[a-zA-Z0-9_]{4,20}$/.test(value);
                                    return isValidEmail || isValidUsername || 'Enter a valid email (user@domain.com) or username (4-20 alphanumeric characters)';
                                }
                            })} />
                        {errors.emailOrUsername && <p className='text-red-500 text-xs font-semibold'>{errors.emailOrUsername.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='text-slate-900 text-sm font-medium'>Password</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='********'
                            className={`w-full text-sm bg-white border-1 ${errors.password ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 8 characters' }
                            })} />
                        {errors.password && <p className='text-red-500 text-xs font-semibold'>{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-slate-900 font-medium">Sign in as</label>
                        <div className='flex'>
                            <div>
                                <input type="radio" id="renter" value="renter" {...register('role', { required: 'Please select a role' })} />
                                <label htmlFor="renter" className="ml-1 mr-4 text-sm">Renter</label>
                            </div>
                            <div>
                                <input type="radio" id="lender" value="lender" {...register('role', { required: 'Please select a role' })} />
                                <label htmlFor="lender" className="ml-1 text-sm">Lender</label>
                            </div>
                        </div>
                        {errors.role && <p className='text-red-500 text-xs font-semibold'>{errors.role.message}</p>}
                    </div>
                    <div className='flex justify-between'>
                        <button className='text-white bg-slate-700 text-sm px-4 py-2 rounded-md cursor-pointer'>
                            Login
                        </button>
                        <Link className='text-sm text-zinc-700 underline'>
                            Forgot Password?
                        </Link>
                    </div>

                </form>

            </div>
            <div className='text-sm text-center'>
                Don't have an account? <Link to={'/signup'} className='text-zinc-800 underline'>Register here</Link>
            </div>
        </Auth>
    )
}

export default Login