import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import './sigh-in.css';
import Link from "next/link";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Усі поля мають бути заповнені.');
            return;
        }

        try {
            const { data } = await api.post('/auth/signup', { email, password });
            localStorage.setItem('token', data.token);
            router.push('/personal-cabinet');
        } catch {
            setError('Сталася помилка при реєстрації.');
        }
    };

    return (
        <div className="sign-in-container">
            <h1>Реєстрація</h1>
            <form onSubmit={handleSignUp} className="sign-in-form">
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle-button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=100236&format=png&color=077f00"
                            alt="Toggle password visibility"
                            className="eye-icon"
                        />
                    </button>
                </div>
                <button type="submit" className="sign-in-button">Зареєструватися</button>
            </form>
            {error && <p className="error-message">{error}</p>}
                <p className='forgot-password-link'>
                    <Link href="/sigh-in">
                        Вже є акаунт? Увійти
                    </Link>
            </p>
        </div>
    );
};

export default SignUp;
