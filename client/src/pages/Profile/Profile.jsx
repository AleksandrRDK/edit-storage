import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import LoginForm from '../../components/profile/LoginForm/LoginForm';
import UserInfo from '../../components/profile/UserInfo/UserInfo';
import FavoritesSection from '../../components/profile/FavoritesSection/FavoritesSection';
import ChangePasswordModal from '../../components/profile/UserInfo/ChangePasswordModal/ChangePasswordModal';
import { changePassword, getMe } from '../../api/authApi';

import './Profile.sass';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        getMe()
            .then((data) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.error('Ошибка при получении пользователя:', err);
                if (err.message === 'Не удалось получить пользователя') {
                    localStorage.removeItem('token');
                }
                setUser(null);
            });
    }, []);

    function handleChangePassword() {
        setShowChangeModal(true);
    }

    function handlePasswordChange(oldPassword, newPassword) {
        changePassword(oldPassword, newPassword)
            .then(() => {
                setSuccessMsg('Пароль успешно изменён');
                setError(null);
                setShowChangeModal(false);
            })
            .catch((err) => {
                setError(err.message || 'Ошибка при смене пароля');
                setSuccessMsg(null);
            });
    }

    return (
        <main className="profile-page-wrapper">
            <Sidebar />
            <div className="profile-page">
                {!user ? (
                    <LoginForm onLogin={setUser} />
                ) : (
                    <>
                        {error && <div className="message error">{error}</div>}
                        {successMsg && (
                            <div className="message success">{successMsg}</div>
                        )}

                        <div className="profile-header">
                            <UserInfo
                                user={user}
                                onChangePassword={handleChangePassword}
                            />
                        </div>

                        {showChangeModal && (
                            <ChangePasswordModal
                                onClose={() => setShowChangeModal(false)}
                                onSubmit={handlePasswordChange}
                            />
                        )}

                        <hr className="section-divider" />
                        <FavoritesSection favorites={user.favorites} />
                    </>
                )}
            </div>
        </main>
    );
}
