'use client';
import './account-menu.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AccountMenu: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);
    }, []);

    const handleLoginRedirect = () => {
        router.push('/sigh-in');
    };

    const handlePersonalCabinetRedirect = () => {
        router.push('/personal-cabinet');
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="account-menu">
            {!token ? (
                <button
                    onClick={handleLoginRedirect}
                    className="login-button"
                >
                    Увійти
                </button>
            ) : (
                <Image
                    src="/images/ispfp=no.png"
                    alt="User Icon"
                    width={48}
                    height={48}
                    className="user-icon"
                    onClick={handlePersonalCabinetRedirect}
                />
            )}
        </div>
    );
};

export default AccountMenu;