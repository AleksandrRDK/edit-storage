import './UserInfo.sass';

export default function UserInfo({ user, onChangePassword }) {
    const formattedDate = new Date(user.createdAt).toLocaleDateString('ru-RU');

    return (
        <div className="user-info">
            <h2>Профиль</h2>
            <div className="field">
                <span>Email:</span>
                <span>{user.email}</span>
            </div>
            <div className="field">
                <span>Никнейм:</span>
                <span>{user.nickname}</span>
            </div>
            <div className="field">
                <span>Дата регистрации:</span>
                <span>{formattedDate}</span>
            </div>
            {onChangePassword && (
                <button
                    className="change-password-btn"
                    onClick={onChangePassword}
                >
                    Изменить пароль
                </button>
            )}
            <button
                className="add-edit-button"
                onClick={() => (window.location.href = '/add-edit')}
            >
                + Добавить эдит
            </button>
        </div>
    );
}
