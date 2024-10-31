import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [memId, setMemId] = useState(localStorage.getItem('memId'));
    const [role, setRole] = useState(localStorage.getItem('role'));

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

    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await axios.post('/member/refresh-token', { refreshToken });
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return newToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            return null;
        }
    }, [refreshToken, logout]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    refreshAccessToken();
                } else {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                logout();
            }
        }
    }, [token, logout, refreshAccessToken]);

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
            console.error('Login failed:', error);
            logout();
        }
    }, [logout]);

    return (
        <AuthContext.Provider value={{ token, refreshToken, memId, role, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
