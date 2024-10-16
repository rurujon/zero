// src/components/login/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [memId, setMemId] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                setToken(savedToken);
                setMemId(decoded.sub);
            } catch (error) {
                console.error('Token decoding failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('memId');
            }
        }
    }, []);

    const login = (newToken, id) => {
        try {
            jwtDecode(newToken); // Token validation
            setToken(newToken);
            setMemId(id);
            localStorage.setItem('token', newToken);
            localStorage.setItem('memId', id);
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    };

    const logout = () => {
        setToken(null);
        setMemId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('memId');
    };

    return (
        <AuthContext.Provider value={{ token, memId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
