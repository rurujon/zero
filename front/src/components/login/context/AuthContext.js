// src/components/login/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [memId, setMemId] = useState(null);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const logoutTimerRef = useRef(null);
    const isAutoLogout = useRef(false);

    const logout = useCallback((isAuto = false) => {
        setToken(null);
        setMemId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('memId');
        delete axios.defaults.headers.common['Authorization'];
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
        isAutoLogout.current = isAuto;
        setShowLogoutMessage(isAuto);
    }, []);

    const resetLogoutTimer = useCallback(() => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
        logoutTimerRef.current = setTimeout(() => {
            logout(true);
        }, 60000); // 1분 = 60000ms
    }, [logout]);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                setToken(savedToken);
                setMemId(decoded.sub);
                axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
                resetLogoutTimer();
            } catch (error) {
                console.error('Token decoding failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('memId');
            }
        }
    }, [resetLogoutTimer]);

    const login = useCallback((newToken, id) => {
        try {
            jwtDecode(newToken);
            setToken(newToken);
            setMemId(id);
            localStorage.setItem('token', newToken);
            localStorage.setItem('memId', id);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            resetLogoutTimer();
            setShowLogoutMessage(false);
            isAutoLogout.current = false;
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }, [resetLogoutTimer]);

    return (
        <AuthContext.Provider value={{ token, memId, login, logout, resetLogoutTimer, showLogoutMessage, setShowLogoutMessage }}>
            {children}
        </AuthContext.Provider>
    );
};
