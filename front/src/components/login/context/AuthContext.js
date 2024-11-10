import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [memId, setMemId] = useState(localStorage.getItem('memId'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [isRefreshing, setIsRefreshing] = useState(false);

    const logout = useCallback(async () => {
        try {
            await axios.post('/member/logout', null, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setToken(null);
            setRefreshToken(null);
            setMemId(null);
            setRole(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('memId');
            localStorage.removeItem('role');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const refreshAccessToken = useCallback(async () => {
        if (isRefreshing) return null;
        setIsRefreshing(true);
        try {
            const response = await axios.post('/member/refresh-token', { refreshToken });
            const newToken = response.data.token;
            const newRefreshToken = response.data.refreshToken;
            setToken(newToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return newToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            return null;
        } finally {
            setIsRefreshing(false);
        }
    }, [refreshToken, logout, isRefreshing]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    refreshAccessToken();
                } else {
                    const timeUntilExpiry = decoded.exp * 1000 - Date.now();
                    setTimeout(() => refreshAccessToken(), timeUntilExpiry - 60000); // 만료 1분 전에 갱신
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                logout();
            }
        }
    }, [token, logout, refreshAccessToken]);

    const login = useCallback((newToken, newRefreshToken, id, userRole) => {
        try {
            if (typeof newToken !== 'string') {
                throw new Error('Invalid token format');
            }
            const decoded = jwtDecode(newToken);
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
            throw error;
        }
    }, [logout]);

    return (
        <AuthContext.Provider value={{ token, refreshToken, memId, role, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
