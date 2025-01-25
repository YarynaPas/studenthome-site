import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import Menu from "@/Components/MenuComponent/MenuComponent";
import './styles/forgot-password.css';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('Інструкції по відновленню паролю надіслано на вашу електронну пошту.');
        } catch {
            setMessage('Сталася помилка, спробуйте ще раз.');
        }
    };

    return (
        <div className="page-container">
            <div className="menu-container">
                <Menu />
            </div>

            <div className="sign-in-container">
                <h1>Відновлення паролю</h1>
                <form className="sign-in-form" onSubmit={handleForgotPassword}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Надіслати</button>
                </form>
                {message && <p className="error-message">{message}</p>}
                <p>
                    <button
                        onClick={() => router.push('sigh-in')}
                        className="forgot-password-link"
                    >
                        Повернутися до входу
                    </button>
                </p>
            </div>

            <div className="footer-container">
                <FooterComponent />
            </div>
        </div>
    );
};

export default ForgotPassword;
