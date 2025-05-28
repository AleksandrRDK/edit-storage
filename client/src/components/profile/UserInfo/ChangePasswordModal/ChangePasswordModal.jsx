import { useState } from 'react';
import './ChangePasswordModal.sass';

export default function ChangePasswordModal({ onClose, onSubmit }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        setError('');
        onSubmit({ oldPassword: currentPassword, newPassword });
    }

    function handleClose() {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Смена пароля</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Текущий пароль"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Повторите новый пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <div className="modal-buttons">
                        <button type="submit">Сменить</button>
                        <button type="button" onClick={handleClose}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
