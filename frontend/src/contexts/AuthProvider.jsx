import React, { createContext, use, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // fetching data from cookie or localStorage
    const userData = Cookies.get('token') || localStorage.getItem('userdata');

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/auth/me', {withCredentials: true});
          setAuthUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }, [])

    // parsing the user data and storing it into the state
    const [authUser, setAuthUser] = useState(
        userData ? JSON.parse(userData) : undefined
    );


  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
        { children }
    </AuthContext.Provider>
  )
}

// custom hook
export const useAuth = () => useContext(AuthContext);