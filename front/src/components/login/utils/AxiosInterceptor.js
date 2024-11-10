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
        if (error.response && error.response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axios.request(error.config);
          } else {
            logout();
            navigate('/login', { state: { message: '세션이 만료되었습니다. 다시 로그인해주세요.' } });
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
