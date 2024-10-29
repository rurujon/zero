import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [memId, setMemId] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setMemId(null);
        // 필요한 경우 다른 상태도 초기화
      };

    // const logout = useCallback(() => {
    //     setToken(null);
    //     setMemId(null);
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('memId');
    //     delete axios.defaults.headers.common['Authorization'];
    // }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                setToken(savedToken);
                setMemId(decoded.sub);
                axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
            } catch (error) {
                console.error('Token decoding failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('memId');
            }
        }
    }, []);

    const login = useCallback((newToken, id) => {
        try {
            jwtDecode(newToken);
            setToken(newToken);
            setMemId(id);
            localStorage.setItem('token', newToken);
            localStorage.setItem('memId', id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            token,
            memId,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
