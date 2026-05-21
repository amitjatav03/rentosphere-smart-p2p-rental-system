import React from 'react'
import Auth from '../components/authpage/Auth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthProvider'
import { useForm } from 'react-hook-form'

const signupPage = {
    title: "Create your space",
    desc: "Join the marketplace to rent or lend with a streamlined experience.",
    img: "https://plus.unsplash.com/premium_photo-1687402901376-d282b1ad0162?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    btmline: "We respect our privacy. Your data stay yours.",
    links: ["Guide", "Support", "Terms"]
}




const Signup = () => {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            fullname: '',
            username: '',
            email: '',
            phone: '',
            role: '',
            password: '',
            confirmPassword: ''
        }
    });

    const password = watch('password');

    const submitHandler = async (data) => {
        await axios.post('http://localhost:4000/api/auth/signup', data, {
            withCredentials: true
        })
        .then(res => {
            if(res.data) {
                toast.success("User Created Successfully!!😊")
                setAuthUser(res.data);
            }
            
            localStorage.setItem('userdata', JSON.stringify(res.data));
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            if(err.response) {
                // alert('Error in Signing up');
                toast.error("Account already exists with this email or username.")
                console.log(err.response.data);
            }
        })
    }

    return (
        <Auth data={signupPage}>
            <div className='flex flex-col gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold'>Create Your Account</h1>
                    <p className='text-slate-500'>Fill in the details below to get started.</p>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="fullname" className='text-slate-900 text-sm font-medium'>Full Name</label>
                            <input
                                type="text"
                                id='fullname'
                                placeholder='John Doe'
                                className={`w-full text-sm bg-white border-1 ${errors.fullname ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                                {...register('fullname', { 
                                    required: 'Full name is required',
                                    minLength: { value: 3, message: 'Full name must be at least 3 characters' },
                                    pattern: { value: /^[a-zA-Z\s]*$/, message: 'Full name should only contain letters and spaces' }
                                })} />
                            {errors.fullname && <p className='text-red-500 text-xs font-semibold'>{errors.fullname.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className='text-slate-900 text-sm font-medium'>Username</label>
                            <input
                                type="text"
                                id='username'
                                placeholder='johndoe'
                                className={`w-full text-sm bg-white border-1 ${errors.username ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`} 
                                {...register('username', { 
                                    required: { value: true, message: 'Username is required'}, 
                                    maxLength: {value: 20, message: "Username should be atleast 20 characters"}, 
                                    minLength: {value: 4, message: "Username should be 4 characters"}
                                })} 
                            />
                            {errors.username && <p className='text-red-500 text-xs font-semibold'>{errors.username.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='text-slate-900 text-sm font-medium'>Email</label>
                            <input
                                type="email"
                                id='email'
                                placeholder='johndoe@gmail.com'
                                className={`w-full text-sm bg-white border-1 ${errors.email ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
                                })} />
                            {errors.email && <p className='text-red-500 text-xs font-semibold'>{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-slate-900 text-sm font-medium'>Phone Number</label>
                            <input
                                type="tel"
                                id='phone'
                                placeholder='9876 XXX XXX'
                                className={`w-full text-sm bg-white border-1 ${errors.phone ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                                {...register('phone', { 
                                    required: { value: true, message: 'Phone number is required'}, 
                                    pattern: { 
                                        value: /^[6-9]\d{9}$/i, 
                                        message: "Invalid Phone Number" 
                                    }
                                })}  
                            />
                            {errors.phone && <p className='text-red-500 text-xs font-semibold'>{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='text-slate-900 text-sm font-medium'>Password</label>
                            <input
                                type="password"
                                id='password'
                                placeholder='********'
                                className={`w-full text-sm bg-white border-1 ${errors.password ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}

                                {...register('password', { 
                                    required: { value: true, message: 'Password is required'},
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/i,
                                        message: "Password must be 8+ characters with uppercase, lowercase, number & symbol."
                                    }
                                })}  
                            />
                            {errors.password && <p className='text-red-500 text-xs font-semibold'>{errors.password.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="confirmPassword" className='text-slate-90 text-sm font-medium'>Confirm Password</label>
                            <input
                                type="password"
                                id='confirmPassword'
                                placeholder='********'
                                className={`w-full text-sm bg-white border-1 ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-400' } px-4 py-2 rounded-md`}
                                {...register('confirmPassword', { 
                                    required: 'Please confirm your password',
                                    validate: (value) => value === password || "Confirm password doesn't match"
                                })} />
                            {errors.confirmPassword && <p className='text-red-500 text-xs font-semibold'>{errors.confirmPassword.message}</p>}
                        </div>

                    </div>
                    <div>
                        <label className="block mb-1 text-slate-900 text-sm font-medium">Register as</label>
                        <div className='flex'>
                            <div className='flex items-center'>
                                <input
                                    type="radio"
                                    id="renter"
                                    value="renter"
                                    {...register('role', { required: 'Please select a role' })} />
                                <label htmlFor="renter" className="ml-1 mr-4 text-sm">Renter</label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="radio"
                                    id="lender"
                                    value="lender"
                                    {...register('role', { required: 'Please select a role' })} />
                                <label htmlFor="lender" className="ml-1 text-sm">Lender</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button className='text-white text-sm bg-slate-700 px-4 py-2 rounded-md cursor-pointer'>
                            Register
                        </button>
                    </div>

                </form>
            </div>
            <div className='text-sm text-center'>
                Don't have an account? <Link to={'/login'} className='text-zinc-800 underline'>Login here</Link>
            </div>
        </Auth>
    )
}

export default Signup