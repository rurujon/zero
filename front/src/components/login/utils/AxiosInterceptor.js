import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AxiosInterceptor = ({ children }) => {
  const { refreshAccessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 403) {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;
                        return axios.request(error.config);
                    } else {
                        logout();
                        navigate('/mainpage');
                    }
                }
                return Promise.reject(error);
            }
        );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshAccessToken, logout, navigate]);

  return <>{children}</>;
};

export default AxiosInterceptor;
