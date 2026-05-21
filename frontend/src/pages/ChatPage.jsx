import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack, IoSend } from 'react-icons/io5'
import { useAuth } from '../contexts/AuthProvider'
import { toast } from 'react-toastify'

const ChatPage = () => {

    const { rentalId } = useParams();

    const navigate = useNavigate();

    const [authUser] = useAuth();

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState('');

    const [loading, setLoading] = useState(true);

    const [receiverId, setReceiverId] = useState('');

    const [rentalData, setRentalData] = useState(null);

    const messagesEndRef = useRef(null);

    // ================= FETCH RENTAL =================

    const fetchRental = async () => {

        try {

            const res = await axios.get(
                `http://localhost:4000/api/rentals/${rentalId}`,
                {
                    withCredentials: true
                }
            );

            const rental = res.data.rental;

            setRentalData(rental);

            // SET RECEIVER ID

            if (
                rental.ownerId._id === authUser.user._id
            ) {

                setReceiverId(rental.renterId._id);

            } else {

                setReceiverId(rental.ownerId._id);
            }

        } catch (error) {

            console.log(error);
        }
    }

    // ================= FETCH MESSAGES =================

    const fetchMessages = async () => {

        try {

            const res = await axios.get(
                `http://localhost:4000/api/messages/${rentalId}`,
                {
                    withCredentials: true
                }
            );

            setMessages(res.data.messages || []);

        } catch (error) {

            console.log(error);
        }
    }

    // ================= INITIAL LOAD =================

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await fetchRental();

            await fetchMessages();

            setLoading(false);
        }

        loadData();

    }, []);

    // ================= AUTO REFRESH =================

    useEffect(() => {

        const interval = setInterval(() => {

            fetchMessages();

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    // ================= AUTO SCROLL =================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });

    }, [messages]);

    // ================= SEND MESSAGE =================

    const sendMessage = async () => {

        try {

            if (!text.trim()) {

                return;
            }

            if (!receiverId) {

                toast.error("Receiver not found");

                return;
            }

            await axios.post(
                'http://localhost:4000/api/messages',
                {
                    rentalId,
                    receiverId,
                    text
                },
                {
                    withCredentials: true
                }
            );

            setText('');

            fetchMessages();

        } catch (error) {

            console.log(error);

            toast.error('Failed to send message');
        }
    }

    // ================= ENTER PRESS =================

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {

            sendMessage();
        }
    }

    // ================= LOADING =================

    if (loading) {

        return (

            <div className='w-full h-screen flex justify-center items-center text-2xl'>

                Loading Chat...

            </div>
        )
    }

    // ================= OTHER USER =================

    const otherUser = rentalData
        ? (
            rentalData.ownerId._id === authUser.user._id
                ? rentalData.renterId
                : rentalData.ownerId
        )
        : null;

    const initials = otherUser?.fullname
        ?.split(' ')
        ?.map(word => word[0])
        ?.join('')
        ?.slice(0, 2);

    return (

        <div className='w-full bg-slate-100 pt-24 px-5 min-h-screen'>

            <div className='w-full max-w-5xl h-[85vh] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col'>

                {/* ================= HEADER ================= */}

                <div className='w-full min-h-[90px] px-6 border-b border-slate-200 flex items-center gap-4 bg-white flex-shrink-0'>

                    <button
                        onClick={() => navigate(-1)}
                        className='text-2xl cursor-pointer hover:text-blue-600 transition-all'
                    >
                        <IoArrowBack />
                    </button>

                    <img
                        className='w-14 h-14 rounded-full object-cover'
                        src={`https://api.dicebear.com/9.x/initials/svg?backgroundColor=A19E97&seed=${initials}`}
                        alt="profile"
                    />

                    <div className='flex flex-col'>

                        <h1 className='text-xl font-semibold text-slate-800 leading-none'>

                            {otherUser?.fullname || "User"}

                        </h1>

                        <p className='text-sm text-slate-500 mt-1'>

                            {rentalData?.productId?.productTitle || "Rental Chat"}

                        </p>

                    </div>

                </div>

                {/* ================= MESSAGES ================= */}

                <div className='flex-1 overflow-y-auto px-6 py-5 bg-slate-50 flex flex-col gap-4'>

                    {
                        messages.length === 0 && (

                            <div className='w-full h-full flex justify-center items-center text-slate-400'>

                                No messages yet

                            </div>
                        )
                    }

                    {
                        messages.map((msg) => {

                            const isMyMessage =
                                msg.senderId._id === authUser.user._id;

                            return (

                                <div
                                    key={msg._id}
                                    className={`w-full flex ${
                                        isMyMessage
                                            ? 'justify-end'
                                            : 'justify-start'
                                    }`}
                                >

                                    <div
                                        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm
                                        
                                        ${
                                            isMyMessage
                                                ? 'bg-blue-600 text-white rounded-br-sm'
                                                : 'bg-white text-slate-800 rounded-bl-sm border border-slate-200'
                                        }`}
                                    >

                                        <p className='text-sm break-words'>

                                            {msg.text}

                                        </p>

                                        <p
                                            className={`text-[11px] mt-2
                                            
                                            ${
                                                isMyMessage
                                                    ? 'text-blue-100'
                                                    : 'text-slate-400'
                                            }`}
                                        >

                                            {
                                                new Date(msg.createdAt)
                                                    .toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                            }

                                        </p>

                                    </div>

                                </div>
                            )
                        })
                    }

                    <div ref={messagesEndRef}></div>

                </div>

                {/* ================= INPUT ================= */}

                <div className='w-full p-4 border-t border-slate-200 bg-white flex items-center gap-3 flex-shrink-0'>

                    <input
                        type="text"
                        placeholder='Type your message...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='flex-1 border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500'
                    />

                    <button
                        onClick={sendMessage}
                        className='bg-blue-600 hover:bg-blue-500 transition-all text-white w-16 h-16 rounded-2xl flex justify-center items-center cursor-pointer flex-shrink-0'
                    >

                        <IoSend size={24} />

                    </button>

                </div>

            </div>

        </div>
    )
}

export default ChatPage