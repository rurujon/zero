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
            async error => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // 여기서 리프레시 토큰을 사용하여 새 액세스 토큰을 요청합니다.
                        const response = await axios.post('/api/refresh-token');
                        const newToken = response.data.token;
                        localStorage.setItem('token', newToken);
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return axios(originalRequest);

                        // 리프레시 토큰 로직이 구현되지 않았다면 로그아웃 처리
                        logout();
                        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                    } catch (refreshError) {
                        logout();
                        alert('인증에 실패했습니다. 다시 로그인해주세요.');
                        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                        return Promise.reject(refreshError);
                    }
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
