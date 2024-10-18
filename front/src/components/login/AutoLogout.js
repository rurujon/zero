// src/components/login/AutoLogout.js
import { useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const AutoLogout = () => {
    const { resetLogoutTimer } = useContext(AuthContext);

    useEffect(() => {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        const resetTimer = () => {
            resetLogoutTimer();
        };

        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetLogoutTimer]);

    return null;
};

export default AutoLogout;
