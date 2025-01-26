import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from "@/utils/api";
import './styles/body.css';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";
import Menu from "@/Components/MenuComponent/MenuComponent";
import '../Components/Auth/sigh-in.css';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const { token } = router.query;
    const [newPassword, setNewPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-passwordauth/reset-password`, { token, newPassword });
            setMessage(data.message);
            await router.push('/sigh-in');  // Перенаправлення після успішного скидання пароля
        } catch {
            setMessage('Помилка. Спробуйте ще раз.');
        }
    };

    return (
        <div className="page-container">
            <div className="menu-container">
                <Menu />
            </div>

            <div className="sign-in-container">
                <h1>Скидання пароля</h1>
                <form className="sign-in-form" onSubmit={handleResetPassword}>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Новий пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Скинути пароль</button>
                </form>
                {message && <p className="error-message">{message}</p>}
            </div>

            <div className="footer-container">
                <FooterComponent />
            </div>
        </div>
    );
};

export default ResetPassword;
