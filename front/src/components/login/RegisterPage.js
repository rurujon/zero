import React from 'react';
import MemberForm from './MemberForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = ({ onRegisterSuccess, onRegisterCancel }) => {
    const handleRegisterSuccess = () => {
        onRegisterSuccess();
    };

    const handleCancel = () => {
        onRegisterCancel();
    };

    return (
        <MemberForm
            onSubmit={handleRegisterSuccess}
            onCancel={handleCancel}
            isEditing={false}
        />
    );
};

export default RegisterPage;
