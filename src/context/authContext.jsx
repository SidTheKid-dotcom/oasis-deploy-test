// app/context/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [navBarData, setNavBarData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchNavBarData();
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    if (!token) {
      router.push('/auth');
    }
  }, [token, router]);

  const fetchNavBarData = async () => {
    try {
      const response = await axios.get('https://oasis-api.xyz/api/user/navbar', {
        headers: {
          Authorization: token,  // Added 'Bearer' for token format
        },
      });

      if (response.status === 200) {
        setNavBarData(response.data);
      } else {
        console.error(`Failed to fetch navbar data: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching navbar data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, navBarData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
