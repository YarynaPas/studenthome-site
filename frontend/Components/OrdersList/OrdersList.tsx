import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import ReviewForm from "@/Components/rewiewComponent/rewiewComponent";
import './order-list.css';
import axios from "axios";

interface Order {
    id: number;
    topic: string;
    status: string;
    discipline_name: string;
    subject_name: string;
    number_of_pages: number;
    deadline: string;
    comment: string;
    cost?: number;
    social_media: string;
    application_date: string;
    payment_status: string;
    file_path?: string;
}

interface OrdersListProps {
    status: string;
}

const OrdersList: React.FC<OrdersListProps> = ({ status }) => {
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Токен не знайдений. Будь ласка, увійдіть.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.get(`/order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllOrders(data);
        } catch (err) {
            setError('Не вдалося завантажити замовлення.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrder = async (orderId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Токен не знайдений. Будь ласка, увійдіть.');
            return;
        }

        try {
            await api.delete(`/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (err) {
            setError('Не вдалося скасувати замовлення.');
        }
    };

    const handleAttachFile = async (orderId: number, selectedFile: File) => {
        if (!selectedFile) {
            setError('Будь ласка, виберіть файл для прикріплення.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Токен не знайдений. Будь ласка, увійдіть.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/attach-file`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                fetchOrders();
            } else {
                setError('Не вдалося прикріпити файл.');
            }
        } catch (error) {
            setError('Сталася помилка під час прикріплення файлу.');
        }
    };

    const handleDownload = async (orderId: number, filePath: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Токен не знайдений. Будь ласка, увійдіть.');
                return;
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/download`,
                {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                const fileBlob = response.data;
                const decodedFileName = decodeURIComponent(filePath.split('/').pop() || 'file');

                const link = document.createElement('a');
                link.href = URL.createObjectURL(fileBlob);
                link.download = decodedFileName;
                link.click();
                URL.revokeObjectURL(link.href);
            } else {
                setError('Не вдалося завантажити файл.');
            }
        } catch (error) {
            setError('Сталася помилка під час завантаження файлу.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        setFilteredOrders(allOrders.filter((order) => order.status === status));
    }, [allOrders, status]);

    if (loading) {
        return <p className="loading">Завантаження...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="orders-list-container">
            <h2 className="orders-list-header">Роботи зі статусом: {status}</h2>
            {filteredOrders.length > 0 ? (
                <ul className="orders-list">
                    {filteredOrders.map((order) => (
                        <li key={order.id} className="order-item">
                            <h3 className="order-title">{order.topic}</h3>
                            <p className="order-detail">Предмет: {order.subject_name}</p>
                            <p className="order-detail">Сторінки: {order.number_of_pages}</p>
                            <p className="order-detail">Дедлайн: {new Date(order.deadline).toLocaleDateString()}</p>
                            <p className="order-detail">Статус оплати: {order.payment_status}</p>
                            <p className="order-cost">
                                Ціна: {order.cost !== undefined ? `${order.cost} грн` : 'Ціна незабаром з\'явиться після оцінки вартості'}
                            </p>
                            <p className="order-status">Статус: {order.status}</p>
                            <p className="order-comment">Коментар: {order.comment}</p>
                            <p className="order-detail">Ваші соціальні мережі: {order.social_media}</p>

                            {order.cost !== undefined && order.payment_status === 'не оплачено' && (
                                <div className="payment-info">
                                    <p>Ми приступимо до написання вашої роботи одразу після передплати 50% від вартості.</p>
                                    <p><strong>Наші реквізити:</strong> VISA / MASTERCARD / РАХУНОК ФОП</p>
                                </div>
                            )}

                            {order.status === 'в обробці' && (
                                <button
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="delete-order-button"
                                >
                                    Скасувати замовлення
                                </button>
                            )}

                            {order.file_path && (
                                <div className="file-download">
                                    <button
                                        onClick={() => handleDownload(order.id, order.file_path)}
                                        className="download-button"
                                    >
                                        Завантажити файл
                                    </button>
                                </div>
                            )}

                            {order.status === 'готове' && (
                                <ReviewForm orderId={order.id} onReviewSubmitted={() => fetchOrders()} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Немає замовлень із цим статусом.</p>
            )}
        </div>
    );
};

export default OrdersList;
