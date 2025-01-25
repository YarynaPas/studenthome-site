import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import './sigh-in.css';
import api from '@/utils/api';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch('http://localhost:3003/users/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to fetch user data:', errorText);
                return;
            }

            const data = await response.json();

            if (data.role === 'admin') {
                router.push('/admin-cabinet');
            } else {
                router.push('/personal-cabinet');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Усі поля мають бути заповнені.');
            return;
        }

        try {
            const { data } = await api.post('/auth/signin', { email, password });
            localStorage.setItem('token', data.token);
            fetchUserData(data.token);
        } catch (err) {
            setError('Невірний логін або пароль.');
        }
    };

    return (
        <div className="sign-in-container">
            <h1>Вхід</h1>
            <form onSubmit={handleSignIn} className="sign-in-form">
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
                        aria-label="Toggle password visibility">
                        <img
                            src="https://img.icons8.com/?size=100&id=100236&format=png&color=077f00"
                            alt="Toggle password visibility"
                            className="eye-icon"
                        />
                    </button>
                </div>
                <button type="submit" className="sign-in-button">Увійти</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="links-container">
                <p>
                    <Link href="/forgot-password">
                        Забули пароль?
                    </Link>
                </p>
                <p>
                    Немає акаунта?{' '}
                    <Link href="/sigh-up">
                        Зареєструйтесь
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
