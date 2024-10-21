import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [memId, setMemId] = useState(null);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [isAutoLogout, setIsAutoLogout] = useState(false);
    const logoutTimerRef = useRef(null);

    const logout = useCallback((isAuto = false) => {
        setToken(null);
        setMemId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('memId');
        delete axios.defaults.headers.common['Authorization'];
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
        setShowLogoutMessage(isAuto);
        setIsAutoLogout(isAuto);
    }, []);

    const resetLogoutTimer = useCallback(() => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
        logoutTimerRef.current = setTimeout(() => {
            logout(true);  // 자동 로그아웃임을 표시
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
        } else {
            // 토큰이 없을 때는 타이머를 초기화하지 않음
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
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
            setIsAutoLogout(false);
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }, [resetLogoutTimer]);

    return (
        <AuthContext.Provider value={{
            token,
            memId,
            login,
            logout,
            resetLogoutTimer,
            showLogoutMessage,
            setShowLogoutMessage,
            isAutoLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
