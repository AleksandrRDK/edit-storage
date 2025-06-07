import { useState } from 'react';
import { registerUser, loginUser } from '../../../api/authApi';
import Loading from '../../Loading/Loading';
import './LoginForm.sass';

export default function LoginForm({ onLogin }) {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('user');
    const [adminSecret, setAdminSecret] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Введите email');
            return;
        }

        if (!password) {
            setError('Введите пароль');
            return;
        }

        if (mode === 'register') {
            if (!nickname) {
                setError('Введите никнейм');
                return;
            }
        }

        if (password.length < 8) {
            setError('Пароль должен быть не менее 8 символов');
            return;
        }
        if (role === 'admin' && !adminSecret) {
            setError('Введите пароль администратора');
            return;
        }

        try {
            if (mode === 'register') {
                setLoading(true);
                await registerUser({
                    email,
                    password,
                    nickname,
                    role,
                    adminSecret,
                });
            }
            setLoading(true);
            const { token, user } = await loginUser({ email, password });
            localStorage.setItem('token', token);
            onLogin(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="login-form">
            <div className="login-form-wrapper">
                <div className="toggle">
                    <button
                        className={mode === 'login' ? 'active' : ''}
                        onClick={() => setMode('login')}
                    >
                        Войти
                    </button>
                    <button
                        className={mode === 'register' ? 'active' : ''}
                        onClick={() => setMode('register')}
                    >
                        Зарегистрироваться
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {mode === 'register' && (
                        <>
                            <input
                                type="text"
                                placeholder="Никнейм"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="role-select"
                            >
                                <option value="user">
                                    Обычный пользователь
                                </option>
                                <option value="admin">Админ</option>
                            </select>
                            {role === 'admin' && (
                                <input
                                    type="password"
                                    placeholder="Пароль администратора"
                                    value={adminSecret}
                                    onChange={(e) =>
                                        setAdminSecret(e.target.value)
                                    }
                                    required
                                />
                            )}
                        </>
                    )}
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}
