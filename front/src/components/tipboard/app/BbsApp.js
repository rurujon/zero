import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import HttpHeadersProvider from '../context/HttpHeadersProvider';
import Nav from './Nav';

function BbsApp() {

  return (
    <div>
      <AuthProvider>
        <HttpHeadersProvider>
          <Routes>
            <Route path="/" element={<Nav />} />
          </Routes>
        </HttpHeadersProvider>
      </AuthProvider>
    </div>
  );
}

export default BbsApp;
