import React from 'react';
import MemberForm from './MemberForm';

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
