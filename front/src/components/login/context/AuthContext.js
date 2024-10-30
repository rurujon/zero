import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [memId, setMemId] = useState(null);
    const [role, setRole] = useState(null);

    const logout = useCallback(() => {
        setToken(null);
        setRefreshToken(null);
        setMemId(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('memId');
        localStorage.removeItem('role');
        delete axios.defaults.headers.common['Authorization'];
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        if (savedToken && savedRefreshToken) {
            try {
                const decoded = jwtDecode(savedToken);
                setToken(savedToken);
                setRefreshToken(savedRefreshToken);
                setMemId(decoded.sub);
                setRole(decoded.role);
                axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
            } catch (error) {
                console.error('Token decoding failed:', error);
                logout();
            }
        }
    }, [logout]);

    const login = useCallback((newToken, newRefreshToken, id, userRole) => {
        try {
            jwtDecode(newToken);
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            setMemId(id);
            setRole(userRole);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            localStorage.setItem('memId', id);
            localStorage.setItem('role', userRole);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }, []);

    const refreshTokenFunc = useCallback(async () => {
        try {
            const response = await axios.post('/member/refresh-token', { refreshToken });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return newToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
            return null;
        }
    }, [refreshToken, logout]);

    return (
        <AuthContext.Provider value={{
            token,
            refreshToken,
            memId,
            role,
            login,
            logout,
            refreshTokenFunc
        }}>
            {children}
        </AuthContext.Provider>
    );
};
