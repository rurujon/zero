// src/components/login/utils/AxiosInterceptor.js
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AxiosInterceptor = ({ children }) => {
    const { token, logout } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    logout();
                    alert('Your session has expired. Please log in again.');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [token, logout]);

    return children;
};

export default AxiosInterceptor;
