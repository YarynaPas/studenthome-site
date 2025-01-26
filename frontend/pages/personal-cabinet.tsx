import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateOrderForm from '@/components/CreateOrder/CreateOrderForm';
import OrdersList from '@/components/OrdersList/OrdersList';
import UserInfo from '@/components/UserInfo/UserInfo';
import './styles/personal-cabinet.css';
import FooterComponent from '@/Components/FooterComponent/FooterComponent';
import Menu from '@/Components/MenuComponent/MenuComponent';

const PersonalCabinet: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('в обробці');
    const [userData, setUserData] = useState<{
        email: string;
        full_name?: string;
        university?: string;
        specialty?: string;
        research_group?: string;
        phone_number?: string;
        social_media?: string;
    }>({ email: '' });
    const [showUserInfo, setShowUserInfo] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                const redirectUrl =
                    process.env.NODE_ENV === 'production'
                        ? 'https://yourdomain.com/main'
                        : '${process.env.NEXT_PUBLIC_API_URL}/main';

                router.push(redirectUrl);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    if (data.message === 'Invalid or expired token') {
                        router.push('/sigh-in');
                    }
                    throw new Error(data.message);
                }

                const user = await response.json();
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [router]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        router.push('/main');
    };

    const handleOrderCreated = () => {
        setSelectedStatus('Заявка подана');
    };

    const handleUserDataChange = (newData: any) => {
        setUserData(newData);
    };

    return (
        <div className="personal-cabinet">
            <Menu />
            <h1 className="cabinet-title">Особистий Кабінет</h1>
            <p className="user-greeting">Вітаємо, {userData.full_name || userData.email || 'користувач'}</p>

            <nav className="navigation">
                <button onClick={() => setIsModalOpen(true)} className="nav-button">
                    Створити замовлення
                </button>
                <button onClick={() => setSelectedStatus('в обробці')} className="nav-button">
                    Роботи в обробці
                </button>
                <button onClick={() => setSelectedStatus('в процесі написання')} className="nav-button">
                    Роботи в процесі написання
                </button>
                <button onClick={() => setSelectedStatus('готове')} className="nav-button">
                    Готові роботи
                </button>
                <button onClick={() => setShowUserInfo(!showUserInfo)} className="nav-button">
                    {showUserInfo ? 'Закрити редагування' : 'Ваша інформація'}
                </button>
                <button onClick={handleSignOut} className="nav-button">
                    Вихід
                </button>
            </nav>

            {showUserInfo && (
                <UserInfo userData={userData} onUserDataChange={handleUserDataChange} />
            )}

            {selectedStatus && <OrdersList status={selectedStatus} />}
            {isModalOpen && (
                <div className="modal-overlay">
                    <CreateOrderForm
                        onOrderCreated={handleOrderCreated}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>
            )}
            <FooterComponent />
        </div>
    );
};

export default PersonalCabinet;
