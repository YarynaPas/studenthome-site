import React, { useState } from 'react';
import './UserInfo.css';

interface UserInfoProps {
    userData: {
        email: string;
        full_name?: string;
        university?: string;
        specialty?: string;
        research_group?: string;
        phone_number?: string;
        social_media?: string;
    };
    onUserDataChange: (newData: any) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData, onUserDataChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState(userData);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        onUserDataChange(editedUserData);
    };

    const handleChange = (field: string, value: string) => {
        setEditedUserData({
            ...editedUserData,
            [field]: value,
        });
    };

    return (
        <div className="user-info">
            <h2 className="user-info-title">Ваша інформація</h2>
            {isEditing ? (
                <div className="user-info-form">
                    <label className="user-info-label">
                        П.І.Б.:
                        <input
                            type="text"
                            value={editedUserData.full_name || ''}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <label className="user-info-label">
                        Університет:
                        <input
                            type="text"
                            value={editedUserData.university || ''}
                            onChange={(e) => handleChange('university', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <label className="user-info-label">
                        Спеціальність:
                        <input
                            type="text"
                            value={editedUserData.specialty || ''}
                            onChange={(e) => handleChange('specialty', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <label className="user-info-label">
                        Група досліджень:
                        <input
                            type="text"
                            value={editedUserData.research_group || ''}
                            onChange={(e) => handleChange('research_group', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <label className="user-info-label">
                        Номер телефону:
                        <input
                            type="text"
                            value={editedUserData.phone_number || ''}
                            onChange={(e) => handleChange('phone_number', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <label className="user-info-label">
                        Соціальні мережі:
                        <input
                            type="text"
                            value={editedUserData.social_media || ''}
                            onChange={(e) => handleChange('social_media', e.target.value)}
                            className="user-info-input"
                        />
                    </label>
                    <button onClick={handleSaveChanges} className="user-info-save-button">
                        Зберегти зміни
                    </button>
                </div>
            ) : (
                <div className="user-info-details">
                    <p className="user-info-detail">П.І.Б.: {userData.full_name || 'Не вказано'}</p>
                    <p className="user-info-detail">Університет: {userData.university || 'Не вказано'}</p>
                    <p className="user-info-detail">Спеціальність: {userData.specialty || 'Не вказано'}</p>
                    <p className="user-info-detail">Група досліджень: {userData.research_group || 'Не вказано'}</p>
                    <p className="user-info-detail">Номер телефону: {userData.phone_number || 'Не вказано'}</p>
                    <p className="user-info-detail">Соціальні мережі: {userData.social_media || 'Не вказано'}</p>
                    <button onClick={handleEditClick} className="user-info-edit-button">
                        Редагувати інформацію
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
